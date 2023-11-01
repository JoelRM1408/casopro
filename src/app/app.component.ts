import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AutorService } from './services/autor/autor.service';
import { EditorialService } from './services/editorial/editorial.service';
import { CategoriaService } from './services/categoria/categoria.service';
import { LibroService } from './services/libro/libro.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'casopropuesto';
  casopropuestoForm : FormGroup =new FormGroup({});
  autores:any;
  categorias: any;
  editoriales:any;
  libros:any;

  constructor(
    public fb:FormBuilder,
    public autorService:AutorService,
    public editorialService:EditorialService,
    public categoriaService:CategoriaService,
    public libroService:LibroService,
  ){

  }
  ngOnInit(): void {
    this.casopropuestoForm = this.fb.group ({
      id: [''],
      titulo:['', Validators.required],
      fechalan:['', Validators.required],
      idioma:['', Validators.required],
      paginas:['', Validators.required],
      descripcion:['', Validators.required],
      portada:['', Validators.required],
      autor:['', Validators.required],
      categoria:['', Validators.required],
      editorial:['', Validators.required],
    });;

    this.libroService.getallLibros().subscribe(resp => {
      this.libros = resp;
      //console.log(resp);
    },
      error => { console.error(error) }
    )


    this.autorService.getallAutores().subscribe(resp => {
      this.autores = resp;
      //console.log(resp);
    },
      error => { console.error(error) }
    )

    this.categoriaService.getallCategorias().subscribe(resp => {
      this.categorias = resp;
      //console.log(resp);
    },
      error => { console.error(error) }
    )

    this.editorialService.getallEditoriales().subscribe(resp => {
      this.editoriales = resp;
      //console.log(resp);
    },
      error => { console.error(error) }
    )
  }
  guardar():void{
    this.libroService.saveLibro(this.casopropuestoForm.value).subscribe(resp=>{
      this.casopropuestoForm.reset();
      this.libros= this.libros.filter((libro: { id: any; })=> resp.id!=libro.id);
      this.libros.push(resp);
    },
      error=> {console.error(error)}
    )
  }

  // eliminar(libro: { id: any; }){
  //   this.libroService.deleteLibro(libro.id).subscribe(resp=>{
  //     if(resp===true){
  //     this.libros.pop(libro);
  //     }
  //   })
  //   this.libroService.getallLibros();
  // }

  eliminar(libro: { id: any }) {
    // Realiza la eliminación de forma optimista en la vista
    const libroIndex = this.libros.findIndex((l: { id: any; }) => l.id === libro.id);
    if (libroIndex !== -1) {
      this.libros.splice(libroIndex, 1);
    }

    // Luego, intenta eliminar el libro en el servidor
    this.libroService.deleteLibro(libro.id).subscribe(resp => {
      //console.log();
      // if (resp !== true) {
      //   // Si la eliminación en el servidor falla, revierte la actualización en la vista
      //   this.libros.splice(libroIndex, 0, libro);
      // }
    });
  }

  editar(libro: { id:any; titulo: any; fechalan: any; idioma: any; paginas: any; descripcion: any; portada: any; autor: any; categoria: any; editorial: any; }){
    this.casopropuestoForm.setValue({
      id: libro.id,
      titulo: libro.titulo,
      fechalan: libro.fechalan,
      idioma: libro.idioma,
      paginas: libro.paginas,
      descripcion: libro.descripcion,
      portada: libro.portada,
      autor: libro.autor,
      categoria: libro.categoria,
      editorial: libro.editorial,
    })
  }

}
