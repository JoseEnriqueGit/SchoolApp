import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
export interface StudentData {
  nombre: string;
  apellido: string;
  Lengua_espanola: number;
  Matematica: number;
  Ciencias_sociales: number;
  Ciencias_naturales: number;
  Literal: string;
}

@Component({
  selector: 'AddStudentComponent',
  templateUrl: './AddStudentComponent.html',
  styleUrls: ['./AddStudentComponent.scss'],
})
export class AddStudentComponent {
  constructor(private http: HttpClient) {}
  @Input() getStudents: (() => void) | undefined;

  dataSourceAdd = new MatTableDataSource<StudentData>([
    {
      nombre: '',
      apellido: '',
      Lengua_espanola: 0,
      Matematica: 0,
      Ciencias_sociales: 0,
      Ciencias_naturales: 0,
      Literal: 'N',
    },
  ]);

  average() {
    const data = this.dataSourceAdd.data[0];
    const promedio =
      (parseInt(data.Lengua_espanola.toString(), 10) +
        parseInt(data.Matematica.toString(), 10) +
        parseInt(data.Ciencias_sociales.toString(), 10) +
        parseInt(data.Ciencias_naturales.toString(), 10)) /
      4;

    console.log(promedio);
    if (promedio >= 90) {
      data.Literal = 'A';
    } else if (promedio >= 80 && promedio < 90) {
      data.Literal = 'B';
    } else if (promedio >= 70 && promedio < 80) {
      data.Literal = 'C';
    } else {
      data.Literal = 'F';
    }
  }

  addData() {
    const data = this.dataSourceAdd.data[0];
    if (!data.nombre || !data.apellido) {
      alert('Nombre y Apellido son requeridos');
      return;
    }
    this.average();
    this.http
      .post(
        'https://schoolapi-vkp2.onrender.com/new-estudiante',
        this.dataSourceAdd.data[0]
      )
      .subscribe((response) => {
        console.log(response);
        if (this.getStudents) {
          this.getStudents();
        }
      });
  }

  value: string = '';
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'Lengua Espanola',
    'Matematicas',
    'Ciencias Naturales',
    'Ciencias Sociales',
  ];
}
