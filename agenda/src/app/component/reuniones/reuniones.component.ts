import { Component, OnInit } from '@angular/core';

import { CommonModule, formatDate } from '@angular/common';
import { ReunionesService } from '../../services/reuniones.service';
import { Reunion } from '../models/reunion.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
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
    hora: 0,
    duracion: '',
    detalle: ''
  };
  fechaFiltro: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');
 
  invalidDate = false;
  invalidHour = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private reunionesService: ReunionesService) { }

  ngOnInit() {
    this.cargarReuniones();

  }
  //Validar hora 
  validateHour(event: any) {
    const hour = event.target.value;
    const isValidHour = hour >= 8 && hour <= 22;

    this.invalidHour = !isValidHour;
    if (!isValidHour) {
      this.nuevaReunion.hora =8
    }
  }

  // Validar que no se seleccione sabado o domingo
  validateDate(event: any) {
    const selectedDate = new Date(event.target.value);
    const day = selectedDate.getUTCDay();
    if (day === 0 || day === 6) {
      this.invalidDate = true;
    
      this.nuevaReunion.dia = '';  
      this.invalidDate = false;
    }
  }


  cargarReuniones() {
    this.reunionesService.getReuniones(this.fechaFiltro).subscribe(reuniones => {
      this.reuniones = reuniones;
    });
  }

  crearReunion() {
    const reunionesEnLaFecha = this.reuniones.filter(reunion => reunion.dia === this.nuevaReunion.dia);
    if (reunionesEnLaFecha.length >= 10) {
      this.errorMessage = 'No se pueden crear más de 10 reuniones en la misma fecha.';
      return;
    }
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
  logout() {
    this.router.navigate(['/login']);
  }
}


