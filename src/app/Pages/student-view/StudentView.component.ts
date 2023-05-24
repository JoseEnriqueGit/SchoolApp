import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

export interface StudentData {
  position: number;
  nombre: string;
  apellido: string;
  LenguaEspanola: number | null;
  Matematicas: number | null;
  CienciasNaturales: number | null;
  Ciencias_Sociales: number | null;
  Promedio: string | null;
}

@Component({
  selector: 'StudentViewComponent',
  templateUrl: './StudentViewComponent.html',
  styleUrls: ['./StudentViewComponent.scss'],
})
export class StudentViewComponent {

  constructor(private http: HttpClient) {}

  value: string = '';

  dataSource = new MatTableDataSource<StudentData>([]);

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.http.get<StudentData[]>('https://apischoolapimana.azure-api.net/estudiante')
    .subscribe((data: StudentData[]) => {
      this.dataSource = new MatTableDataSource(data);
    });   
  }


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
