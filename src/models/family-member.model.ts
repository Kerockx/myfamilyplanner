import { DefFamilyMemberType } from "./def-family-member-type.model";

export class FamilyMember {
    ID:number | null = null;
    def_family_member_type?:DefFamilyMemberType;
    nID_family!:number;
    nID_def_family_member_type!:number;
    txt_name!:string;
    nID_user?:number;
}
