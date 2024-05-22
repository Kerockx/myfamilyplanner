module.exports = {
    apps: [
      {
        name: 'Bauplanungstool',
        script: 'server.js',
        log_date_format: 'YYYY-MM-DD HH:mm Z',
        out_file: 'server.log',  // Pfad zur stdout-Log-Datei
        error_file: 'server-error.log',  // Pfad zur stderr-Log-Datei

      },
    ],
  };

