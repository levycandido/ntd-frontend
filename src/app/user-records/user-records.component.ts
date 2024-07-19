import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {RecordService} from "../services/RecordService";
import {Record} from "../entity/Record";


@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.scss']
})
export class UserRecordsComponent implements OnInit {
  displayedColumns: string[] = ['operation', 'amount', 'balance', 'response', 'date'];
  dataSource: MatTableDataSource<Record>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private recordService: RecordService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.recordService.getRecords().subscribe((records: Record[]) => {
      this.dataSource.data = records;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilterColumn(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Record, filter: string) => {
      const textToSearch = data[column as keyof Record] && data[column as keyof Record].toString().toLowerCase() || '';
      return textToSearch.includes(filter);
    };
    this.dataSource.filter = filterValue;
  }
}
