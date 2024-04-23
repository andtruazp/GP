export class Actividad {
    id_a?: number;
    id_p: number;
    id_u:number;
    nom_a: string;
    des_a: string;
    estado: boolean;
    fecha_fin: string;
    notas?: string;

    constructor(id_a: number,
        id_p: number,
        id_u:number,
        nom_a: string,
        des_a: string,
        estado: boolean,
        fecha_fin: string,
        notas: string){
            this.id_a = id_a,
            this.id_p = id_p,
            this.id_u=id_u,
            this.nom_a=nom_a,
            this.des_a=des_a,
            this.estado=estado,
            this.fecha_fin = fecha_fin,
            this.notas=notas
        }

}