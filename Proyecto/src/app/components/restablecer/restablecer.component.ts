import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent implements OnInit {
  token!: string;
  newPassword!: string;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient) { }
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      this.token = params.get('token');
      console.log(this.token)
    });
  }

  cambiarContrasena() {
    // Validar la nueva contraseña antes de enviar la solicitud
    if (this.newPassword.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    const body = { newPassword: this.newPassword, 
      token: this.token
    };

    this.http.post('http://localhost:3002/cambiar-contrasena', body).subscribe(
      (response)=> {
        Swal.fire({
          icon: "success",
          text: "Contraseña restablecida exitosamente",
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Error al enviar la contraseña. Por favor, verifica tu conexión a internet e intenta nuevamente.');
      });
  }


  updatePassword(event: any) {
    this.newPassword = event.target?.value || '';
    console.log(this.newPassword)
  }
}
