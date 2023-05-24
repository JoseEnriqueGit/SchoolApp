import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

export interface StudentData {
  _id: string;
  position: string;
  nombre: string;
  apellido: string;
}

export interface SelectionData {
  id_estudiante: string;
  fecha: Date;
  presente: boolean;
}

@Component({
  selector: 'AttendanceViewComponent',
  templateUrl: './attendance-view.component.html',
  styleUrls: ['./attendance-view.component.scss'],
})
export class AttendanceViewComponent {
  displayedColumns: string[] = ['select', 'position', 'nombre', 'apellido'];
  dataSource = new MatTableDataSource<StudentData>();
  selection = new SelectionModel<StudentData>(true, []);

  value: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.http
      .get<StudentData[]>('https://schoolapi-vkp2.onrender.com/all-estudiante')
      .subscribe((data: StudentData[]) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: StudentData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  saveData() {
    if (this.value === '') {
      alert('La fecha es requerida');
      return;
    }
    // const selectedData = this.dataSource.data.map((student) => ({
    //   id_estudiante: student._id,
    //   fecha: this.value,
    //   presente: this.selection.isSelected(student),
    // }));
    const selectedData = this.selection.selected.map((student) => ({
      id_estudiante: student._id,
      fecha: this.value,
      presente: true,
    }));
    this.http
      .post('https://schoolapi-vkp2.onrender.com/new-asistencia', selectedData)
      .subscribe();
  }
  
}
