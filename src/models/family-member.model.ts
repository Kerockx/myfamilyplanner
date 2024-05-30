import { DefFamilyMemberType } from "./def-family-member-type.model";

export class FamilyMember {
    ID:number | null = null;
    def_family_member_type!:DefFamilyMemberType;
    nID_family!:number;
    nID_def_family_member!:number;
    txt_name!:string;
}
