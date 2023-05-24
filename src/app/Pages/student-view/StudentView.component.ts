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

  ngOnInit() {
    this.getStudents();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStudents() {
    this.http.get<StudentData[]>('https://schoolapi-vkp2.onrender.com/all-estudiante')
    .subscribe((data: StudentData[]) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource.data);
      
    });   
  }
  deleteStudent(id: number) {
    this.http.delete(`https://schoolapi-vkp2.onrender.com/delete-estudiante/${id}`)
    .subscribe(() => {
      this.getStudents();
    });
  }



}
