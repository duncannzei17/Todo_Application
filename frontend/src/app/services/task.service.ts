import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskRequest } from '../models/task.model';

const API_URL = 'http://localhost:8080/api/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(API_URL);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${API_URL}/${id}`);
  }

  createTask(task: TaskRequest): Observable<Task> {
    return this.http.post<Task>(API_URL, task);
  }

  updateTask(id: number, task: TaskRequest): Observable<Task> {
    return this.http.put<Task>(`${API_URL}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}