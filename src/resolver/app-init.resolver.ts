import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { DefFamilyMemberType } from "../models/def-family-member-type.model";
import { inject } from "@angular/core";
import { StorageService } from "../services/Storage/storage.service";
import { FamilyAPIService } from "../services/Family/family-api.service";
import { DefService } from "../services/Def/def.service";
import { FamilyStorage } from "../config/storage.config";
import { DefActivity } from "../models/def-activity.model";
import { DefAPIService } from "../services/Def/def-api.service";
import { UserService } from "../services/User/user.service";
import { firstValueFrom } from "rxjs";
import { User } from "../models/user.model";
import { DefActivityCategory } from "../models/def-activity-category.model";

      

export const defFamilyMemberResolver: ResolveFn<DefFamilyMemberType[]> = async(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
    return await firstValueFrom(inject(FamilyAPIService).getAllDefFamilyMemberTypes());
};

export const defActivityResolver: ResolveFn<DefActivity[]> = async(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
    const obj= await firstValueFrom(inject(DefAPIService).getAllDefActivities());
    return obj;
};

export const defActivityCategoryResolver: ResolveFn<DefActivityCategory[]> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
    return await firstValueFrom(inject(DefAPIService).getAllDefActivityCategories());
};

export const userResolver: ResolveFn<User | null> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  try {
    const user = await firstValueFrom(inject(UserService).getCurrentUserFromStorage());
    return user;
  } catch (error) {
    console.error("Error resolving user:", error);
    return null;
  }
};