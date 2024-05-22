import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { server } from '../../environments/environment';
import { Task } from '../../models/task.model';
import { TaskCategorySubDef } from '../../models/task-category-sub-def.model';
import { TaskCategoryDef } from '../../models/task-category-def.model';
import { Family } from '../../models/family.model';
import { TaskCategorySubSubDef } from '../../models/task-category-sub-sub-def.modelmodel';

const taskAPI = 'tab_tasks'
const taskBaseUrl = `${server.URL}/api/${taskAPI}`;

const TaskCategoryDefAPI = 'def_task_category'
const TaskCategoryDefBaseUrl = `${server.URL}/api/${TaskCategoryDefAPI}`;

const TaskCategorySubDefAPI = 'def_task_category_sub'
const TaskCategorySubDefBaseUrl = `${server.URL}/api/${TaskCategorySubDefAPI}`;

const TaskCategorySubSubDefAPI = 'def_task_category_sub_sub'
const TaskCategorySubSubDefBaseUrl = `${server.URL}/api/${TaskCategorySubSubDefAPI}`;

@Injectable({
  providedIn: 'root'
})

export class TaskAPIService {

  constructor(private http: HttpClient) {}

  /*----------------------------------------------------------------
  Task API
  ----------------------------------------------------------------*/
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(taskBaseUrl);
  }
  getAllTasksByFamily(value:Family): Observable<Task[]> {
    const ID = value.ID;
    return this.http.get<Task[]>(`${taskBaseUrl}/family/${ID}`);
  }
  getTask(value: Task): Observable<Task> {
    const ID = value.ID;
    return this.http.get<Task>(`${taskBaseUrl}/${ID}`);
  }
  createTask(data: Task): Observable<Task> {
    return this.http.post<Task>(taskBaseUrl, data);
  }
  updateTask(value: Task, data: Task): Observable<Task> {
    const ID = value.ID;
    return this.http.put<Task>(`${taskBaseUrl}/${ID}`, data);
  }
  deleteTask(value: Task): Observable<any> {
    const ID = value.ID;
    return this.http.delete(`${taskBaseUrl}/${ID}`);
  }
  deleteAllTasks(): Observable<any> {
    return this.http.delete(taskBaseUrl);
  }

  /*----------------------------------------------------------------
  TaskCategoryDef API
  ----------------------------------------------------------------*/
  getAllTaskCategoryDefs(): Observable<TaskCategoryDef[]> {
    return this.http.get<TaskCategoryDef[]>(TaskCategoryDefBaseUrl);
  }
  getTaskCategoryDef(value: TaskCategoryDef): Observable<TaskCategoryDef> {
    const ID = value.ID;
    return this.http.get<TaskCategoryDef>(`${TaskCategoryDefBaseUrl}/${ID}`);
  }
  createTaskDef(data: TaskCategoryDef): Observable<TaskCategoryDef> {
    return this.http.post<TaskCategoryDef>(TaskCategoryDefBaseUrl, data);
  }
  updateTaskCategoryDef(value: TaskCategoryDef, data: TaskCategoryDef): Observable<TaskCategoryDef> {
    const ID = value.ID;
    return this.http.put<TaskCategoryDef>(`${TaskCategoryDefBaseUrl}/${ID}`, data);
  }
  deleteTaskCategoryDef(value: TaskCategoryDef): Observable<any> {
    const ID = value.ID;
    return this.http.delete(`${TaskCategoryDefBaseUrl}/${ID}`);
  }
  deleteAllTaskCategoryDefs(): Observable<any> {
    return this.http.delete(TaskCategoryDefBaseUrl);
  }
  
  /*----------------------------------------------------------------
  TaskCategorySubDef API
  ----------------------------------------------------------------*/
  getAllTaskCategorySubDefs(): Observable<TaskCategorySubDef[]> {
    return this.http.get<TaskCategorySubDef[]>(TaskCategorySubDefBaseUrl);
  }
  getAllTaskCategorySubDefsByTaskCategoryDef(value:TaskCategoryDef): Observable<TaskCategorySubDef[]> {
    const ID = value.ID;
    return this.http.get<TaskCategorySubDef[]>(`${TaskCategorySubDefBaseUrl}/Task/${ID}`);
  }
  getTaskCategorySubDef(value: TaskCategorySubDef): Observable<TaskCategorySubDef> {
    const ID = value.ID;
    return this.http.get<TaskCategorySubDef>(`${TaskCategorySubDefBaseUrl}/${ID}`);
  }
  createTaskCategorySubDef(data: TaskCategorySubDef): Observable<TaskCategorySubDef> {
    return this.http.post<TaskCategorySubDef>(TaskCategorySubDefBaseUrl, data);
  }
  updateTaskCategorySubDef(value: TaskCategorySubDef, data: TaskCategorySubDef): Observable<TaskCategorySubDef> {
    const ID = value.ID;
    return this.http.put<TaskCategorySubDef>(`${TaskCategorySubDefBaseUrl}/${ID}`, data);
  }
  deleteTaskCategorySubDef(value: TaskCategorySubDef): Observable<any> {
    const ID = value.ID;
    return this.http.delete(`${TaskCategorySubDefBaseUrl}/${ID}`);
  }
  deleteAllTaskCategorySubDefs(): Observable<any> {
    return this.http.delete(TaskCategorySubDefBaseUrl);
  }

  /*----------------------------------------------------------------
  TaskCategorySubSubDef API
  ----------------------------------------------------------------*/
  getAllTaskCategorySubSubDefs(): Observable<TaskCategorySubSubDef[]> {
    return this.http.get<TaskCategorySubSubDef[]>(TaskCategorySubSubDefBaseUrl);
  }
  getAllTaskCategorySubSubDefsByTaskCategoryDef(value:TaskCategoryDef): Observable<TaskCategorySubSubDef[]> {
    const ID = value.ID;
    return this.http.get<TaskCategorySubSubDef[]>(`${TaskCategorySubSubDefBaseUrl}/Task/${ID}`);
  }
  getTaskCategorySubSubDef(value: TaskCategorySubSubDef): Observable<TaskCategorySubSubDef> {
    const ID = value.ID;
    return this.http.get<TaskCategorySubSubDef>(`${TaskCategorySubSubDefBaseUrl}/${ID}`);
  }
  createTaskCategorySubSubDef(data: TaskCategorySubSubDef): Observable<TaskCategorySubSubDef> {
    return this.http.post<TaskCategorySubSubDef>(TaskCategorySubSubDefBaseUrl, data);
  }
  updateTaskCategorySubSubDef(value: TaskCategorySubSubDef, data: TaskCategorySubSubDef): Observable<TaskCategorySubSubDef> {
    const ID = value.ID;
    return this.http.put<TaskCategorySubSubDef>(`${TaskCategorySubSubDefBaseUrl}/${ID}`, data);
  }
  deleteTaskCategorySubSubDef(value: TaskCategorySubSubDef): Observable<any> {
    const ID = value.ID;
    return this.http.delete(`${TaskCategorySubSubDefBaseUrl}/${ID}`);
  }
  deleteAllTaskCategorySubSubDefs(): Observable<any> {
    return this.http.delete(TaskCategorySubSubDefBaseUrl);
  }
}
