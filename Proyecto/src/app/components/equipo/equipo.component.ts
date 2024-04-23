import { ProyectoService } from './../../service/proyecto.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  proyectos: any[] = [];

  constructor(private router: Router,
      private proyectoService : ProyectoService
    ){}

  ngOnInit(): void {
    this.getProyectos()
  }

  getProyectos(){
    try{
      
      this.proyectoService.getAll().subscribe(proyectos => {
        this.proyectos = proyectos;
        console.log('los valores son',proyectos)
      },
      error => {
        console.error('Error al obtener datos:', error);
      } )
    }catch{
      
      console.log('no existe');
    }
  }

}