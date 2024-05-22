import { FamilyMemberDef } from "./family-member-def.model";

export class FamilyMember {
    ID:number | null = null;
    def_family_member!:FamilyMemberDef;
    nID_family!:number;
    nID_def_family_member!:number;
    txt_name!:string;
}
