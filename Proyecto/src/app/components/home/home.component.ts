import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import Typed from 'typed.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  usuario: any;
  Datosusuario: any;
  Datos: any;
  id_u: any;
  estaLogueado: boolean = false;
  @ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }
  ngOnInit() {
    const options = {
      strings: ["Crear.", "Organizar.", "Gestionar."],
      typeSpeed: 30,
      startDelay: 1200,
      backSpeed: 20,
      backDelay: 500,
      loop: true,
      loopCount: 5,
      showCursor: false,
      cursorChar: "|",
      contentType: 'html',
      callback: () => {},
      preStringTyped: () => {},
      onStringTyped: () => {},
      resetCallback: () => {}
  };  
    const typed = new Typed('.typed', options);

    this.Datosusuario = sessionStorage.getItem('userData');
    this.Datos = JSON.parse(this.Datosusuario);
    console.log(this.Datos)
    const user1 = this.Datos[0];
    this.id_u=user1.id_u

    this.ocultarSeccion();
    this.actualizarTextoEnlace();

    
  }

  ocultarSeccion(): void {
    if (this.Datos) {
      const heroSection = document.getElementById('registrate');
      if (heroSection) {
        heroSection.style.display = 'none';
      }
    }
  }

  rol(){
    if(this.id_u == 1){
      this.router.navigate(['/equipo']);
    }else if(!this.Datos){
      this.router.navigate(['/error403']);
    }else{
      this.router.navigate(['/homeuser']);
    }

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

  cerrarSesion(){
    sessionStorage.removeItem('userData');
    console.log('Sesion finalizada')
    window.location.reload();
  }

  gestionarSesion(): void {
    if (this.estaLogueado) {
      this.cerrarSesion();
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  searchAndNavigate() {
    const searchTerm = this.inputSearch.nativeElement.value.toLowerCase();
    if (searchTerm === 'acerca de nosotros') {
      this.scrollToSection('about');
    } else if (searchTerm === 'enfoque') {
      this.scrollToSection('enfoque');
    } else if (searchTerm === 'servicios') {
      this.scrollToSection('servicios');
    } else if (searchTerm === 'ayuda') {
      this.scrollToSection('ayuda');
    } else if(searchTerm === 'actividad'){
      this.router.navigate(['/homeuser']);
    } else if(searchTerm === 'proyecto' || searchTerm === 'nuevo' || searchTerm === 'crear' ){
      this.router.navigate(['/proyecto']);
    }
  }

  ngAfterViewInit(): void {
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
}