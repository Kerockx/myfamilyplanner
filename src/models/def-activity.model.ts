import { DefActivityCategory } from "./def-activity-category.model";


export class DefActivity {
    ID!:number;
    nID_activity_category!:number;
    txt_name!:string;
    is_main_activity!:boolean;
    is_hoby_activity!:boolean;
    def_activity_category!:DefActivityCategory
}
