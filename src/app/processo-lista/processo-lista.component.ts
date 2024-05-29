import { Component, EventEmitter, OnInit, Output, ElementRef } from '@angular/core';
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
import { ConfirmationDialog } from '../util/confirmation-dialog.component';
import { ProcessoDetalheComponent } from '../processo-detalhe/processo-detalhe.component';


@Component({
  selector: 'app-processo-lista',
  templateUrl: './processo-lista.component.html',
  styleUrls: ['./processo-lista.component.css']
})
export class ProcessoListaComponent implements OnInit {

  @Output() changeIndex = new EventEmitter();

  tab = 'novo';
  nome: string;
  formulario: FormGroup;
  processos: Processo[] = [];
  ufs: Uf[] = [];
  municipios: Municipios[] = [];
  processo: Processo;
  
  colunas = ['npu','uf','dataCadastro','editar','deletar'];
  formData: FormData = new FormData();

  totalElements = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [5,10,20];

  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

  constructor( private fb: FormBuilder,
               private dialog: MatDialog, 
               private snackBar: MatSnackBar,
               private paginator: MatPaginatorIntl,
               private processoService: ProcessoService,
               private regioesService: RegioesService,
               private _elementRef : ElementRef
              ) 
{
   this.paginator.itemsPerPageLabel = "Itens por página";
   this.paginator.nextPageLabel = "próxima página"
   this.paginator.previousPageLabel = "página anterior"

   this.formulario = this.fb.group({
    npu: ['', Validators.required],
    uf: ['', [Validators.required]],
    municipio: ['', [Validators.required]],
    documento: ['', [Validators.required]],
    nomeDocumento: ['']
  })
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


  getMunicipios(uf){
      this.regioesService.listarMunicipios(uf).subscribe(res => {
          this.municipios = res;
      })
  }

  submit(){
   
  
    this.processoService.salvar(this.formData).subscribe(res => {
    this.snackBar.open('O Processo foi adicionado!', 'Sucesso', {
        duration: 2000
      });
     this.ngOnInit(); 
    },
    err => {
      this.formulario.reset();
      console.log(this.nome=err.error);
    }
  );                                   
                                       
                                       

  }

  ordernarColuna(event: Sort) {
    this.getProcessos(this.pagina, this.tamanho, event.active, event.direction);
  }  

  ngOnInit(): void {  
    this.getReset();
    this.getUFs();
    this.getProcessos();
  }

  paginar(evento: PageEvent){
    this.pagina = evento.pageIndex;
    this.tamanho = evento.pageSize;
    this.getProcessos(this.pagina, this.tamanho);
  }

  getReset(){
    this.formulario.reset();
    this.formData = new FormData();
  }
  
  uploadPDF(event){

    const file = event.target.files;
    this.formData = new FormData();
      if(file){
        if(file[0].type === 'application/pdf'){
          const documento = file[0];
          this.formulario.get('nomeDocumento').setValue(documento.name);
          this.formData.append("file",documento);
          this.formData.append("dados", JSON.stringify(this.formulario.value));
        }else{
          this.snackBar.open('Não é arquivo PDF', 'Erro', {
            duration: 3000
          });
        }       
      }
      
}


preparaDelecao(p: Processo) {
  
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Deletetar NPU: '+p.npu,
        buttonText: {
          ok: 'Ok',
          cancel: 'Cancelar'
        }
      }
    });
   
    dialogRef.afterClosed().subscribe((ok: boolean) => {
      if (ok) {
       this.processoService.deletar(p.id).subscribe(res => {
        this.snackBar.open('Deletado com sucesso', 'Fechar', {
          duration: 2000,
        });
        this.getProcessos();
       },
      err => {
        this.snackBar.open(err.error, 'Fechar', {
          duration: 2000,
        });
      })      
      }
    });
  }

  visualizarProcesso(p){

    if(!p?.dataVisualizacao){

    this.processoService.dataVisualizacao(p.id).subscribe(res => {
      this.processo = res
      this.dialog.open(ProcessoDetalheComponent, {
        width:'420px',
        height: '320px',
        data: this.processo
      })
    },
    err => {
      this.dialog.open(ProcessoDetalheComponent, {
        width:'420px',
        height: '320px',
        data: err
      })
    })
  }else{
    this.dialog.open(ProcessoDetalheComponent, {
      width:'420px',
      height: '320px',
      data: p
    })
  }
  }

  public editarProcesso($event) {
    
    console.log(event);
  
  }

  skipToLast() {
    let nextPageBtn = this._elementRef.nativeElement.querySelector('.mat-ripple');
    let loop = setInterval(() => {
      if (nextPageBtn.classList.contains('mat-tab-header-pagination-disabled')) {
        clearInterval(loop);
      }
      console.log('will be clicked')
      nextPageBtn.click();
    }, 100)
  }

}


