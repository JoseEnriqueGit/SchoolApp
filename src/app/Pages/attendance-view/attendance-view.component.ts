import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface StudentData {
  _id: string;
  position: string;
  nombre: string;
  apellido: string;
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

  value: Date = new Date();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

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
    if (this.value === null) {
      alert('La fecha es requerida');
      return;
    }
    const selectedData = this.dataSource.data.map((student) => ({
      id_estudiante: student._id,
      nombre: student.nombre,
      apellido: student.apellido,
      fecha: this.value,
      presente: this.selection.isSelected(student),
    }));
    this.http
      .post('https://schoolapi-vkp2.onrender.com/new-asistencia', selectedData)
      .subscribe(
        (res) => {
          this.selection.clear();
          this.snackBar.open('Datos guardados', 'Cerrar', {
            duration: 2000,
          });
        },
        (err) => {
          if (err.status === 400) {
            this.snackBar.open(err.error.message, 'Cerrar', {
              duration: 2000,
            });
          }
        }
      );
  }
}
