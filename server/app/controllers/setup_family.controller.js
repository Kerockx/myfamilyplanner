const db = require("../models");
const Op = db.Sequelize.Op;

// Create and Save a new Object
exports.setupFamily = async (req, res) => {
  const data = req.body; // Holt die Daten aus dem Request-Body
  const transaction = await db.sequelize.transaction(); // Startet eine neue Datenbank-Transaktion
  try {
    // Erstellt einen neuen Eintrag in der Tabelle 'tab_familys' mit den �bergebenen Familiendaten
    const FAMILY = await db.tab_familys.create(data.family, { transaction });
    const FAMILY_ID = FAMILY.ID; // Speichert die ID der neu erstellten Familie
    // Verkn�pft den Benutzer mit der Familie in der Tabelle 'tabZ_tab_users_tab_familys'
    await db.tabZ_tab_users_tab_familys.create({ nID_user: data.user.ID, nID_family: FAMILY_ID }, { transaction });

    // Erstellt ein Array von Promises f�r die Verarbeitung der Familiendaten
    const familyMemberPromises = data.familyMemberData.map(async (obj) => {
      const familyMember = obj.familyMember; // Holt die Familiendaten
      const mainActivity = obj.mainActivity; // Holt die Hauptaktivit�t
      familyMember.nID_family = FAMILY_ID; // Setzt die Familien-ID f�r das Familienmitglied
      // Erstellt einen neuen Eintrag in der Tabelle 'tab_family_members' f�r das Familienmitglied
      const FAMILY_MEMBER = await db.tab_family_members.create(familyMember, { transaction });
      // Verkn�pft das Familienmitglied mit der Hauptaktivit�t
      await db.tab_family_members_activities.create({ nID_family_member: FAMILY_MEMBER.ID, nID_def_activity: mainActivity.ID }, { transaction });

      // Holt alle Aufgaben, die mit der Hauptaktivit�t verkn�pft sind
      const ACTIVITY_TASKS = await db.def_activity_tasks.findAll({
        where: { nID_activity: mainActivity.ID },
        include: [
          {
            model: db.def_activities,
            required: false,
            include: [{ model: db.def_activity_categories, required: false }]
          }
        ],
        transaction
      });

      // Erstellt ein Array von Promises f�r die Verarbeitung der Aufgaben
      const taskPromises = ACTIVITY_TASKS.map(async (task) => {
        // Erstellt einen neuen Eintrag in der Tabelle 'tab_tasks' f�r die Aufgabe
        const TASK = await db.tab_tasks.create({ nID_family: FAMILY_ID, familyMember, nID_activity_task: task.ID }, { transaction });
        // Verkn�pft die Aufgabe mit dem Familienmitglied
        await db.tabZ_tab_tasks_tab_family_members.create({ nID_task: TASK.ID, nID_family_member: FAMILY_MEMBER.ID }, { transaction });
      });

      // Wartet darauf, dass alle Aufgaben-Promises abgeschlossen sind
      await Promise.all(taskPromises);
    });

    // Wartet darauf, dass alle Familienmitglied-Promises abgeschlossen sind
    await Promise.all(familyMemberPromises);

    await transaction.commit(); // Best�tigt die Transaktion, wenn alle Operationen erfolgreich sind
    res.send(FAMILY); // Sendet die Familiendaten als Antwort
  } catch (err) {
    console.log(err);
    await transaction.rollback(); // Rollback der Transaktion im Fehlerfall
    res.status(500).send({
      message: err.message || "Fehler beim Aktualisieren des Objekts", // Sendet eine Fehlermeldung als Antwort
    });
  }
};
