import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }

      th {
        background-color: #f2f2f2;
      }
    `,
  ],
})
export class PropertyTableComponent {
  @Input() data: any[] = [];
  @Input() tableName: string = '';
  @Input() property: string = '';
  columns: string[] = ['property'];
}
