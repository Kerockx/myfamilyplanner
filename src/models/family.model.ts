import { FamilyMember } from "./family-member.model";

export class Family {
    ID?:number;
    txt_name!:string;
    familyMembers?:FamilyMember;
}
