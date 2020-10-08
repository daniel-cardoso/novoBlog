import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-post-tema',
  templateUrl: './post-tema.component.html',
  styleUrls: ['./post-tema.component.css']
})
export class PostTemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private temaService: TemaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.findAllTemas()
  }


  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.tema.id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }
  cadastrar(){
    this.tema.descricao = this.tema.descricao.trim()
    if (this.tema.descricao == null ||
      this.tema.descricao.length === 0) {
     alert('Preencha o campo de nome do tema corretamente')
    } else {
     this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
       this.tema = resp
       alert('Tema cadastrado com sucesso!')
       this.findAllTemas()
       this.tema.descricao = ""
     })
    }
  }
 }
