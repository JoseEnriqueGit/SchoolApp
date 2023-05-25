import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Asistencia {
  id_estudiante: string;
  fecha: Date;
  presente: boolean;
  nombre: string;
  apellido: string;
}

@Component({
  selector: 'HistoryViewComponent',
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.scss'],
})
export class AttendanceHistoryComponent {
  asistencias: { [fecha: string]: Asistencia[] } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Asistencia[]>('https://schoolapi-vkp2.onrender.com/all-asistencia')
      .subscribe(
        (data) => {
          data.forEach((asistencia) => {
            const fecha = new Date(asistencia.fecha)
              .toISOString()
              .split('T')[0];
            if (!this.asistencias[fecha]) {
              this.asistencias[fecha] = [];
            }
            this.asistencias[fecha].push(asistencia);
          });
        },
        (error) => {
          if (error.status === 404) {
            console.log('No hay asistencias');
          }
        }
      );
  }
}
