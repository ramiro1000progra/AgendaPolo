import { Component, OnInit } from '@angular/core';

import { CommonModule, formatDate } from '@angular/common';
import { ReunionesService } from '../../services/reuniones.service';
import { Reunion } from '../models/reunion.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-reuniones',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './reuniones.component.html',
  styleUrl: './reuniones.component.css'
})
export class ReunionesComponent {
  reuniones: Reunion[] = [];
  nuevaReunion: Reunion = {
     id: 0,
    dia: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    hora: '',
    duracion: '',
    detalle: ''
  };
  fechaFiltro: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(private reunionesService: ReunionesService) { }

  ngOnInit() {
    this.cargarReuniones();
  }

  cargarReuniones() {
    this.reunionesService.getReuniones(this.fechaFiltro).subscribe(reuniones => {
      this.reuniones = reuniones;
    });
  }

  crearReunion() {
    this.reunionesService.createReunion(this.nuevaReunion).subscribe(() => {
      this.cargarReuniones();
    });
  }

  editarReunion(reunion: Reunion) {
    this.reunionesService.updateReunion(reunion).subscribe(() => {
      this.cargarReuniones();
    });
  }

  eliminarReunion(id: number) {
    this.reunionesService.deleteReunion(id).subscribe(() => {
      this.cargarReuniones();
    });
  }

  filtrarReuniones() {
    this.cargarReuniones();
  }
}


