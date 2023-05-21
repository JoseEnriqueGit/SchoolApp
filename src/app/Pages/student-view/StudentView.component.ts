import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface StudentData {
  position: number;
  nombre: string;
  apellido: string;
  LenguaEspanola: number;
  Matematicas: number;
  CienciasNaturales: number;
  CienciasSociales: number;
  Promedio: string;
}

@Component({
  selector: 'StudentViewComponent',
  templateUrl: './StudentViewComponent.html',
  styleUrls: ['./StudentViewComponent.scss'],
})
export class StudentViewComponent {
  dataSource = new MatTableDataSource<StudentData>([
    {
      position: 1,
      nombre: 'Hydrogen',
      apellido: 'H',
      LenguaEspanola: 1.0079,
      Matematicas: 1.0079,
      CienciasNaturales: 1.0079,
      CienciasSociales: 1.0079,
      Promedio: 'A',
    },
    {
      position: 2,
      nombre: 'Helium',
      apellido: 'He',
      LenguaEspanola: 4.0026,
      Matematicas: 4.0026,
      CienciasNaturales: 4.0026,
      CienciasSociales: 4.0026,
      Promedio: 'B',
    },
    {
      position: 3,
      nombre: 'Lithium',
      apellido: 'Li',
      LenguaEspanola: 6.941,
      Matematicas: 6.941,
      CienciasNaturales: 6.941,
      CienciasSociales: 6.941,
      Promedio: 'C',
    },
    {
      position: 4,
      nombre: 'Beryllium',
      apellido: 'Be',
      LenguaEspanola: 9.0122,
      Matematicas: 9.0122,
      CienciasSociales: 10.811,
      CienciasNaturales: 9.0122,
      Promedio: 'D',
    },
    {
      position: 5,
      nombre: 'Boron',
      apellido: 'B',
      LenguaEspanola: 10.811,
      Matematicas: 10.811,
      CienciasNaturales: 10.811,
      CienciasSociales: 10.811,
      Promedio: 'B',
    },
    {
      position: 6,
      nombre: 'Carbon',
      apellido: 'C',
      LenguaEspanola: 12.0107,
      Matematicas: 12.0107,
      CienciasNaturales: 12.0107,
      CienciasSociales: 12.0107,
      Promedio: 'C',
    },
    {
      position: 7,
      nombre: 'Nitrogen',
      apellido: 'N',
      LenguaEspanola: 14.0067,
      Matematicas: 14.0067,
      CienciasNaturales: 14.0067,
      CienciasSociales: 14.0067,
      Promedio: 'D',
    },
    {
      position: 8,
      nombre: 'Oxygen',
      apellido: 'O',
      LenguaEspanola: 15.9994,
      Matematicas: 15.9994,
      CienciasNaturales: 15.9994,
      CienciasSociales: 15.9994,
      Promedio: 'A',
    },
  ]);

  value: string = '';
  displayedColumns: string[] = [
    'position',
    'nombre',
    'apellido',
    'Lengua Espanola',
    'Matematicas',
    'Ciencias Naturales',
    'Ciencias Sociales',
    'Promedio',
    'edit',
    'delete',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
