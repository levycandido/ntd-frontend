import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface Record {
  operation: string;
  amount: number;
  balance: number;
  response: string;
  date: Date;
}

@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.scss']
})
export class UserRecordsComponent implements OnInit {
  displayedColumns: string[] = ['operation', 'amount', 'balance', 'response', 'date', 'delete'];
  dataSource = new MatTableDataSource<Record>([
    { operation: 'Addition', amount: 5, balance: 95, response: '10', date: new Date() },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRecord(id: number) {
  }
}
