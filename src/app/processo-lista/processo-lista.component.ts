import { Component, OnInit } from '@angular/core';
import { Processo } from '../model/processo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ProcessoService } from '../service/processo.service';
import { RegioesService } from '../service/regioes.service';
import { Uf } from '../model/uf';
import { Municipios } from '../model/municipios';

@Component({
  selector: 'app-processo-lista',
  templateUrl: './processo-lista.component.html',
  styleUrls: ['./processo-lista.component.css']
})
export class ProcessoListaComponent implements OnInit {


  nome: string;
  formulario: FormGroup;
  processos: Processo[] = [];
  ufs: Uf[] = [];
  municipios: Municipios[] = [];
  
  colunas = ['npu','uf','dataCadastro'];
  formData: FormData = new FormData();

  totalElements = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [5,10,20];


  constructor( private fb: FormBuilder,
               private dialog: MatDialog, 
               private snackBar: MatSnackBar,
               private paginator: MatPaginatorIntl,
               private processoService: ProcessoService,
               private regioesService: RegioesService
              ) 
{
   this.paginator.itemsPerPageLabel = "Itens por página";
   this.paginator.nextPageLabel = "próxima página"
   this.paginator.previousPageLabel = "página anterior"
}

getProcessos(pagina =0, tamanho = 10, campo="id", direcao='asc'){
      this.processoService.listar(pagina,tamanho,campo,direcao).subscribe( res => {
      
      this.processos = res.content;
      this.totalElements = res.totalElements;
      this.pagina = res.number; 
      });
}

    getUFs(){
      this.regioesService.listarUfs().subscribe( res => {
        this.ufs = res;
      });
  }


  getMunicipios(uf: String){
      this.regioesService.listarMunicipios(uf).subscribe(res => {
          this.municipios = res;
      })
  }

  submit(){
    const formValues = this.formulario.value;
    const processo: Processo = new Processo(formValues.npu,
                                       formValues.uf, 
                                       formValues.municipio,
                                       formValues.dataCadastro,
                                       formValues.documento);   


    this.processoService.salvar(this.formData).subscribe(res => {
      this.snackBar.open('O Processo foi adicionado!', 'Sucesso', {
        duration: 2000
      });
      this.formulario.reset();
      console.log(this.processos);
      this.getProcessos(); 
    },
    err => console.log(this.nome=err.error.message)
  );                                   
                                       
                                       

  }

  ordernarColuna(event: Sort) {
    this.getProcessos(this.pagina, this.tamanho, event.active, event.direction);
  }  

  ngOnInit(): void {

    this.formulario = this.fb.group({
      npu: ['', Validators.required],
      uf: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      documento: ['', [Validators.required]]
    })

    this.getUFs();
    this.getProcessos();
  }

  paginar(evento: PageEvent){
    this.pagina = evento.pageIndex;
    this.tamanho = evento.pageSize;
    this.getProcessos(this.pagina, this.tamanho);
  }


  uploadPDF(event){

    const file = event.target.files;

      if(file){
        const documento = file[0];
        this.formData.append("file",documento);
        this.formData.append("user", JSON.stringify(this.formulario.value))
      }
  
}

}
