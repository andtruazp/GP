import { Usuario } from './../../models/usuario';
import { Actividad } from './../../models/actividad';
import { ActividadService } from './../../service/actividad.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  act: Actividad[] = [];
  integrantes: Usuario[]=[
    { id_u: 1, usuario: "Usuario1" },
    { id_u: 2, usuario: "Usuario2" },
    { id_u: 3, usuario: "Usuario3" }
  ];
  actForm: FormGroup;
  id_u: any;
  id_p:any;
  id: number| null
  Datosusuario: any;
  Datos: any;

  constructor(
    private actividadService: ActividadService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.actForm = this.fb.group({
      id: [''],
      id_p: [''],
      id_u:[''],
      nom_a: ['', Validators.required],
      des_a: ['', Validators.required],
      estado: [0],
      fecha_fin: [null],
      notas: [''], 
    });
    this.id = null;
    this.id_u = null;
    this.id_p = null;
  }
  ngOnInit() :void{
    this.aRoute.params.subscribe(params => {
      this.id_p = params['id_p'];
      console.log('Valor de id_p en actividades:', this.id_p);
    });
    if(!this.id_p){
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    if (this.id) {
      this.getAct(this.id);
    }
    }

    console.log("id: ",this.id)
    console.log("id_p: ",this.id_p)
    console.log("id_u: ",this.id_u)
   
    this.Datosusuario = sessionStorage.getItem('userData');
    this.Datos = JSON.parse(this.Datosusuario);
    const primerUsuario = this.Datos[0];
    console.log(this.Datos)
    this.Datosusuario = sessionStorage.getItem('userData');
    this.id_u = primerUsuario.id_u;
    console.log(this.id_u)

    if (!this.Datos) {
      // Redirigir al usuario a la página de error
      this.router.navigate(['/error403']);
    }
  }

  getAct(id: number): void {
    this.actividadService.getAct(id).subscribe(
      (act) => {
        if(act && act.length > 0){ // Verifica si act es un array y tiene al menos un elemento
          const actd = act[0]; // Accede al primer elemento del array
          this.act = act;
          console.log(actd);
          this.actForm.patchValue({
            id_u: actd.id_u,
            nom_a: actd.nom_a,
            des_a: actd.des_a,
            estado: actd.estado,
            fecha_fin: actd.fecha_fin,
            notas: actd.notas,
          });
        }
      },
      (error) => {
        console.error('Error al obtener la actividad:', error);
      }
    );
}


  getMisAct(){
    try{
      console.log('el id de la actividad es:',this.id)
      this.actividadService.getMisActividades(this.id).subscribe(act => {
        this.act = act;
        console.log('los valores son',act)
      },
      error => {
        console.error('Error al obtener datos:', error);
      } )
    }catch{
      this.id = 0
      console.log('no existe');
    }
    
  }

  
  searchUser(): void {
    try{
      this.actividadService.getU().subscribe((integrantes: Usuario[]) => {
        this.integrantes = integrantes;
        console.log("integrantes listos")
        console.log(integrantes)
      });
    }catch{
      console.log('error al obtener usuarios')
    }
  }
  

  crearAct(){
    const actData = this.actForm.value;
    
    if(this.id !== null && this.id !== 0){
      console.log("id del metodo: ", this.id)
      this.actividadService.updateAct(this.id, actData).subscribe( act => {
          console.log('Actividad Creado:');
          alert('Se actualizo la actividad');
        },
        (error) => {
          console.error('Error al crear el Proyecto:', error);
          alert('¡Hubo un error!');
        }
    );
    }else{
      if (this.actForm.valid){
        const estadoControl = this.actForm.get('estado');
        if (estadoControl) {
            const estadoValue = estadoControl.value ? 1 : 0;
            actData.estado = estadoValue;
        }
        actData.id_p = this.id_p;
        this.actividadService.crearAct(actData).subscribe(
          (response) => {
            console.log('Solicitud POST exitosa', response);
            alert('¡Se creo la actividad!');
          },
          (error) => {
            console.error('Error en la solicitud POST', error);
            alert('¡Hubo un error!');
          }
        );
      } 
    } 
    this.location.back();
  }

  eliminar(id: any) {
    this.actividadService.eliminar(id).subscribe(
      (response) => {
        console.log('Actividad eliminado:', response);
        alert('¡Se a eliminado la actividad!');
      },
      (error) => {
        console.error('Error al eliminar el Proyecto:', error);
        alert('¡Hubo un error!');
      }
    );
  }

  irAtras(): void {
    this.location.back();
  }

}