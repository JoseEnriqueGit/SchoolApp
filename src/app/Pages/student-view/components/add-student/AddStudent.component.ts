import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


export interface StudentData {
  nombre: string;
  apellido: string;
  LenguaEspanola: number;
  Matematicas: number;
  CienciasNaturales: number;
  CienciasSociales: number;
  Promedio: string;
}

@Component({
  selector: 'AddStudentComponent',
  templateUrl: './AddStudentComponent.html',
  styleUrls: ['./AddStudentComponent.scss']
})

export class AddStudentComponent {

  constructor(private http: HttpClient) {}

  dataSource = new MatTableDataSource<StudentData>([
    {
      nombre: '',
      apellido: '',
      LenguaEspanola: 0,
      Matematicas: 0,
      CienciasNaturales: 0,
      CienciasSociales: 0,
      Promedio: 'N'
    }
  ]);

  average() {
    const data = this.dataSource.data[0];
    const promedio = (data.LenguaEspanola + data.Matematicas + data.CienciasNaturales + data.CienciasSociales) / 4;

    if (promedio >= 90) {
      data.Promedio = 'A';
    } else if (promedio >= 80 && promedio < 90) {
      data.Promedio = 'B';
    } else if (promedio >= 70 && promedio < 80) {
      data.Promedio = 'C';
    } else {
      data.Promedio = 'F';
    }
  }

  addData() {
    const data = this.dataSource.data[0];
    if (!data.nombre || !data.apellido) {
      alert('Nombre y Apellido son requeridos');
      return;
    }
    this.average();
    this.http.post('https://apischoolapimana.azure-api.net/estudiante', data)
      .subscribe(response => {
        console.log(response);
      });
  }

  // Access-Control-Allow-Origin @(context.Request.Headers.GetValueOrDefault("Origin",""))
  // Access-Control-Allow-Credentials true

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
