import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

export interface StudentData {
  position: number;
  nombre: string;
  apellido: string;
  LenguaEspanola: number;
  Matematicas: number;
  CienciasNaturales: number;
  Ciencias_Sociales: number;
  Promedio: string;
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
    this.http.get<StudentData[]>('https://apischoolapi.azure-api.net/estudiante')
    .subscribe((data: StudentData[]) => {
    // Asigna los datos recibidos a la propiedad dataSource de tu tabla
    this.dataSource = new MatTableDataSource(data);
    console.log(this.dataSource);
    
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
