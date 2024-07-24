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
    hora: '',
    duracion: '',
    detalle: ''
  };
  fechaFiltro: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  invalidDate = false;
  invalidTime = false;

  constructor(
    private router: Router,
    private reunionesService: ReunionesService) { }

  ngOnInit() {
    this.cargarReuniones();

  }
  //Validar hora 
  validateTime(event: any) {
    const time = event.target.value;
    const [hours, minutes] = time.split(':').map(Number);
    const isValidHour = hours >= 8 && hours <= 22 && minutes === 0;

    this.invalidTime = !isValidHour;
    if (!isValidHour) {
      this.nuevaReunion.hora = '';  
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


