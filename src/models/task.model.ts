import { DefTaskCategorySubSub } from "./def-task-category-sub-sub.model";
import { DefTaskCategorySub } from "./def-task-category-sub.model";
import { FamilyMember } from "./family-member.model";
import { TabzTabTasksTabFamilyMembers } from "./tabz-tab-tasks-tab-family-members.model";

export class Task {
    ID?:number;
    nID_family!:number;
    def_task_category_sub_sub!:DefTaskCategorySubSub;
    nID_task_category_sub_sub!:number;
    txt_name!:string;
    n_duration!:number;
    tabz_tab_tasks_tab_family_members?:TabzTabTasksTabFamilyMembers[];
    family_members?:number[];
}
