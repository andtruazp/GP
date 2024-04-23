import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


interface Pagina {
  titulo: string;
  url: string;
  subpaginas?: { [subpagina: string]: Pagina };
}

interface EstructuraSitio {
  [pagina: string]: Pagina;
}

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit{

  estructuraSitio: EstructuraSitio | undefined;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<any>('../../../assets/estructura-sitio.json').subscribe(data => {
      this.estructuraSitio = data;
      console.log(this.estructuraSitio)
    });
    
  }

}