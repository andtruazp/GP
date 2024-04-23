import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnInit {
  id: any;
  Datosusuario: any;
  Datos: any;
  nombreUsuario: any;
  estaLogueado: boolean = false;

  constructor(private router: Router) { }
  
  ngAfterViewInit() {
    const navToggle: HTMLElement | null = document.querySelector(".nav-toggle");
    const navMenu: HTMLElement | null = document.querySelector(".nav-menu");
    const userToggle: HTMLElement | null = document.querySelector(".user-toggle"); // Corregido
    const userMenu: HTMLElement | null = document.querySelector(".user-dropdown"); // Corregido

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("nav-menu_visible");
      });
    }

    if (userToggle && userMenu) {
      userToggle.addEventListener("click", () => {
        userMenu.classList.toggle("user-dropdown-visible");
      });
    }
  }
  
  cerrarSesion(){
    sessionStorage.removeItem('userData');
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.Datosusuario = sessionStorage.getItem('userData');
    this.Datos = JSON.parse(this.Datosusuario);
    const primerUsuario = this.Datos[0];
    console.log(this.Datos)
    this.id = primerUsuario.id_u;
    this.nombreUsuario = primerUsuario.usuario;
    console.log(this.nombreUsuario)

    
    this.actualizarTextoEnlace();
  }

  

  actualizarTextoEnlace(): void {
    const enlace = document.getElementById('iniciarCerrarSesion');
    if (enlace) {
      if (this.Datos) {
        enlace.textContent = 'Cerrar Sesión';
        this.estaLogueado = true;
      } else {
        enlace.textContent = 'Iniciar Sesión';
        this.estaLogueado = false;
      }
    }
  }

  gestionarSesion(): void {
    if (this.estaLogueado) {
      this.cerrarSesion();
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}