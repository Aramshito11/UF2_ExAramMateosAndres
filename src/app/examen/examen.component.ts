import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent {
  constructor(private http: HttpClient) {
  }
  modifCorreu(){
    this.http.post('http://localhost:4080/modifCorreu',{}).subscribe()
  }

  llistaAssigInfo(){
    this.http.post('http://localhost:4080/llistaAssigInfo',{}).forEach((resposta)=>{
      console.log(resposta)
    })
  }

  afegirDepartament(){
    this.http.post('http://localhost:4080/afegirDepartament', {codi: 7, nom: "tecno", ubicacio:"Vidreres", telef: 633471395, dni:8000}).subscribe((data)=>{
      console.log(data)
    })
  }
  impartirAssig(){
    this.http.post('http://localhost:4080/impartirAssig', {}).forEach((resposta)=>{
      console.log(resposta)
    })
  }
}
