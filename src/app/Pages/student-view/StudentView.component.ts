import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

export interface StudentData {
  position: number;
  nombre: string;
  apellido: string;
  Lengua_espanola: number;
  Matematica: number;
  Ciencias_sociales: number;
  Ciencias_naturales: number;
  Promedio: string | null;
}

export interface StudentDataAdd {
  nombre: string;
  apellido: string;
  Lengua_espanola: number;
  Matematica: number;
  Ciencias_sociales: number;
  Ciencias_naturales: number;
  Literal: string;
}

@Component({
  selector: 'StudentViewComponent',
  templateUrl: './StudentViewComponent.html',
  styleUrls: ['./StudentViewComponent.scss'],
})
export class StudentViewComponent {

  constructor(private http: HttpClient) {}

  value: string = '';
  onEdit: boolean = false;
  idToEdit: string = '';
  nameToEdit: string = '';
  lastNameToEdit: string = '';

  dataSource = new MatTableDataSource<StudentData>([]);

  dataSourceAdd = new MatTableDataSource<StudentDataAdd>([
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

  displayedColumnsAdd: string[] = [
    'nombre',
    'apellido',
    'Lengua Espanola',
    'Matematicas',
    'Ciencias Naturales',
    'Ciencias Sociales',
  ];

  ngOnInit() {
    this.getStudents();
  }

  back() {
    this.onEdit = !this.onEdit;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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

  editStudent(_id: number) {
    if (!this.onEdit) {
      this.onEdit = !this.onEdit;
    }

    this.http.get<StudentData>(`https://schoolapi-vkp2.onrender.com/estudiante/${_id}`)
    .subscribe((data: StudentData) => {
      console.log(data);
      
      this.nameToEdit = data.nombre;
      this.lastNameToEdit = data.apellido;
      this.dataSourceAdd.data[0].nombre = data.nombre;
      this.dataSourceAdd.data[0].apellido = data.apellido;
      this.dataSourceAdd.data[0].Lengua_espanola = data.Lengua_espanola;
      this.dataSourceAdd.data[0].Matematica = data.Matematica;
      this.dataSourceAdd.data[0].Ciencias_sociales = data.Ciencias_sociales;
      this.dataSourceAdd.data[0].Ciencias_naturales = data.Ciencias_naturales;
    }
    );
    this.idToEdit = _id.toString();
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
      .subscribe(() => {
        this.getStudents();
      });
  }

  editData() {
    const data = this.dataSourceAdd.data[0];
    if (!data.nombre || !data.apellido) {
      alert('Nombre y Apellido son requeridos');
      return;
    }
    this.average();
    this.http
      .put(
        `https://schoolapi-vkp2.onrender.com/modic-estudiante/${this.idToEdit}`,
        this.dataSourceAdd.data[0]
      )
      .subscribe(() => {
        this.getStudents();
        this.dataSourceAdd.data[0].nombre = '';
        this.dataSourceAdd.data[0].apellido = '';
        this.dataSourceAdd.data[0].Lengua_espanola = 0;
        this.dataSourceAdd.data[0].Matematica = 0;
        this.dataSourceAdd.data[0].Ciencias_sociales = 0;
        this.dataSourceAdd.data[0].Ciencias_naturales = 0;
        this.back();
      });
  }


}
