import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import _ from 'lodash';

@Component({
  selector: 'ngx-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit, OnChanges {

  @Input() settings: any = {};
  @Input() data: [] = [];
  @Output() action = new EventEmitter<boolean>();
  @Output() addNew = new EventEmitter<boolean>();


  dataSource: any[];
  source: LocalDataSource = new LocalDataSource();

  constructor() {
  }

  ngOnInit() {
  }

  // On Data / Setting Changed update into Table View
  ngOnChanges() {
    this.dataSource = this.data;
    this.source.load(this.data || []);
    this.noDataFoundWithCustomColumn();
  }

  // Custom Action Click Callback
  // data: contains data object with action clicked info
  onCustom(data: any) {
    this.action.emit(data);
  }

  onAddNew() {
    this.addNew.emit();
  }

  // TODO: Not supported from ng2 start table
  // Custom column span not extended in case of "no data found"
  noDataFoundWithCustomColumn() {
    setTimeout(function() {
      const noDataFoundtd = document.querySelector('[colspan]');
      if (noDataFoundtd) {
        const updateColSpan: any = +noDataFoundtd.getAttribute('colspan') + 1;
        noDataFoundtd.setAttribute('colspan', updateColSpan);
      }
    });
  }

  // Apply user search on Table columns
  onSearch(query: string = '') {
    if (query) {
      this.source.setFilter(
        _.map(this.settings.columns, (fObj: object, fName: string) => {
          return {
            field: fName,
            search: query};
          },
        ),
      false);
    } else {
      this.source.reset();
    }
    this.noDataFoundWithCustomColumn();
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }
}
