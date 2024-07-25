export class Reunion {
    id: number;
    dia: string;
    hora: Number;
    duracion: string;
    detalle: string;
  
    constructor(id: number, dia: string, hora: Number, duracion: string, detalle: string) {
      this.id = id;
      this.dia = dia;
      this.hora = hora;
      this.duracion = duracion;
      this.detalle = detalle;
    }
  }
  