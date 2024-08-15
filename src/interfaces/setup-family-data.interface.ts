import { DefFamilyMemberType } from "../models/def-family-member-type.model";
import { FamilyMember } from "../models/family-member.model";
import { Family } from "../models/family.model";
import { User } from "../models/user.model";
import { FamilyMemberData } from "./family-member-data.interface";

export class SetupFamilyData {
    user!:User;
    family!:Family;
    familyMemberData:FamilyMemberData[] = [];
}
