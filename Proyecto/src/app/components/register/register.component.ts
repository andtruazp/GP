import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  correo: string = '';
  siteKey:string;
  captchaDatos: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.siteKey = '6LdtOLwpAAAAABE8w6K_b5ynfzLr5VwsP73Qqyyb';
   }

   registrar() {
    this.errorMessage = '';
  
    if (!this.username || !this.password || !this.correo) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }
  
    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
  
    // Validar el formato del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.correo)) {
      this.errorMessage = 'Por favor, introduzca un correo electrónico válido.';
      return;
    }
    
    const requestData = {
      usuario: this.username,
      contrasena: this.password,
      correo: this.correo
    };
  
    // Realizar la solicitud POST al servidor con los datos en el cuerpo
    this.http.post('http://localhost:3002/register', requestData).subscribe(
      (response: any) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en la solicitud: ', error);
      }
    );
    
  }
  

  updateUsername(event: any) {
    this.username = event.target?.value || '';
    console.log(this.username)
  }

  updatePassword(event: any) {
    this.password = event.target?.value || '';
    console.log(this.password)
  }

  updateCorreo(event: any) {
    this.correo = event.target?.value || '';
    console.log(this.correo)
  }
  handleCaptchaResponse(event: any){
    if(event){
      this.captchaDatos=true;
      console.log(this.captchaDatos)
  }

  }

}
