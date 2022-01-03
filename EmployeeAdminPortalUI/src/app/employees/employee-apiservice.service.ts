import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employee } from '../models/apiModels/employee.model';
import { EmployeesComponent } from './employees.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAPIServiceService {

  private baseAPIUrl = 'http://localhost:5000';
  constructor(private httpClient:HttpClient) { }
  getEmployees():Observable<employee[]>{
    return this.httpClient.get<employee[]>(this.baseAPIUrl + '/employees');

  }
}
