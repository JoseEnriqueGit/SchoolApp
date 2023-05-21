import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface StudentData {
  nombre: string;
  apellido: string;
  LenguaEspanola: number;
  Matematicas: number;
  CienciasNaturales: number;
  CienciasSociales: number;
}

@Component({
  selector: 'AddStudentComponent',
  templateUrl: './AddStudentComponent.html',
  styleUrls: ['./AddStudentComponent.scss']
})

export class AddStudentComponent {
  addData() {
    }

  dataSource = new MatTableDataSource<StudentData>([
    {
      nombre: 'Hydrogen',
      apellido: 'H',
      LenguaEspanola: 1.0079,
      Matematicas: 1.0079,
      CienciasNaturales: 1.0079,
      CienciasSociales: 1.0079,
    }
  ]);

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
