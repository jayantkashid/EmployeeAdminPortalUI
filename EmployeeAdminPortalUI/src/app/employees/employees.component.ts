import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { employee } from '../models/uiModels/employee.model';
import { EmployeeAPIServiceService } from './employee-apiservice.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employee : employee[] = [];
  displayedColumns: string[] = ['Id', 'Name', 'Designation', 'Salary', 'Email', 'JoiningDate'];
  dataSource : MatTableDataSource<employee> = new MatTableDataSource<employee>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  filterString:string = '';
  constructor(private empAPIService: EmployeeAPIServiceService, private _liveAnnouncer: LiveAnnouncer) 
  {


  }


  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.empAPIService.getEmployees().subscribe(
      (successResponse)=>{
        this.employee = successResponse;  
        this.dataSource = new MatTableDataSource<employee>(this.employee);
        

        if(this.paginator){
          this.dataSource.paginator = this.paginator;
        }
      },
      (errorResponse)=>{
          console.log(errorResponse);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
  }

  filterData(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
