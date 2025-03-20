import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/base-setup/services/api-setup.service';
import { AppService } from 'src/app/base-setup/services/app.service';
import { AddUserComponent } from 'src/app/Popups/add-user/add-user.component';

interface Provider{
  'Sl.No': number, 
  'Name': string, 
  'User ID': string, 
  'Phone No': string,
  'Email':string,
  'Gender':string,
  'Asset Type': string, 
  'Quantity': number, 
  'Price per Item': number
  'Purchase Price': number, 
  'Date': string
}

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent {

  headerTitle: string = "User Data";
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  tableData: Array<Provider> = [
    { 'Sl.No': 1, 'Name': 'Prasath D', 'User ID': 'prasath02Jan', 'Phone No': '9629737170', 'Email':'prasath@gmail.com', 'Gender': 'Male', 'Asset Type': 'Stocks', 'Quantity': 2, 'Price per Item':1000, 'Purchase Price': 2000, 'Date': '02-Jan-2025' },
    { 'Sl.No': 2, 'Name': 'Shiva K', 'User ID': 'shiva26Jan', 'Phone No': '9629727170', 'Email':'shiva@gmail.com', 'Gender': 'Male', 'Asset Type': 'Real Estate', 'Quantity': 3, 'Price per Item':2000, 'Purchase Price': 6000, 'Date': '26-Jan-2025' },
  ];
  displayedColumns: any = [];
  columnsToDisplay = this.displayedColumns.slice();

  constructor(private router: Router, private appservice: AppService, public apiService: ApiService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.appservice.updateHeader(this.headerTitle);
    this.loadTableData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  loadTableData() {
    this.displayedColumns = Object.keys(this.tableData[0]);
    this.displayedColumns.push('Action')
    this.columnsToDisplay = this.displayedColumns.slice();
    this.dataSource = new MatTableDataSource<any>(this.tableData);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, 500);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addNewUser(){
    const dialogRefer = this.dialog.open(AddUserComponent, {
      width: '60vh', autoFocus: false , disableClose: false, data: { type:'add' }  
    } );
    dialogRefer.afterClosed().subscribe((res: any) => {
      console.log(res, '-> res');
      this.appservice.setLoading = false;
     if (res) {
      res['Sl.No'] = this.tableData?.length + 1;
      this.tableData.push(res);
      this.loadTableData();
     }
   });
  }
  editUser(element: any, type: string){
    const dialogRefer = this.dialog.open(AddUserComponent, {
      width: '60vh', autoFocus: false , disableClose: false, data: { type: type, user: element }  
    } );
    dialogRefer.afterClosed().subscribe((res: any) => {
      this.appservice.setLoading = false;
     if (res) {
      res['Sl.No'] = element['Sl.No']
      this.tableData[element['Sl.No'] - 1] = res;
      this.loadTableData();
     }
   });
  }
  //sample get api call
  sampleFunction(){
    this.appservice.setLoading = true;
    this.apiService.get('apiname').subscribe((res: any) =>{
      console.log(res, '-> response');
      if(res.status == 'success'){
        this.appservice.openSnackBar('API call is success', 'ok');
        this.appservice.setLoading = false;
      }else{
        this.appservice.openSnackBar('API call has been failed', 'ok');
        this.appservice.setLoading = false;
      }
    }, 
    error =>{
      this.appservice.setLoading = false;
      this.appservice.openSnackBar('API call has been failed', 'ok');
    })
  }
  backtoHome(){
    this.router.navigate(['/home']);
  }

}
