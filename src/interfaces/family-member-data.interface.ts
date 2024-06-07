import { DefActivity } from "../models/def-activity.model";
import { FamilyMember } from "../models/family-member.model";

export class FamilyMemberData {
    familyMember!:FamilyMember;
    mainActivity?:DefActivity;
}