import { Injectable } from '@angular/core';
import { DefTaskRepeat } from '../../models/def-task-repeat.model';

@Injectable({
  providedIn: 'root'
})
export class DefService {

  constructor() { }

  private _defTaskRepeats: DefTaskRepeat[] | undefined
  public get defTaskRepeats(): DefTaskRepeat[] | undefined {
      return this._defTaskRepeats
  }
  public set defTaskRepeats(value: DefTaskRepeat[]) {
      this._defTaskRepeats = value
  }

}
