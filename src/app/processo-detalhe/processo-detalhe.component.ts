import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Processo } from '../model/processo';
import { ThemePalette } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-processo-detalhe',
  templateUrl: './processo-detalhe.component.html',
  styleUrls: ['./processo-detalhe.component.css']
})
export class ProcessoDetalheComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProcessoDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public p: Processo,
     
  ) { 
   // this.fileControl = new FormControl('', [Validators.required])
  }

  fileControl: FormControl;

  accept: string;
  multiple: boolean = false;
  color: ThemePalette = 'primary';

  public listAccepts = [
    null,
    ".png",
    "image/*"
  ];

  fechar(){
    this.dialogRef.close();
  }

  ngOnInit(): void {

 }


 downloadPDF(pdf){

    const downloadLink = document.createElement('a');
    const fileName = pdf.nomeDocumento;

    downloadLink.href = 'data:application/octet-stream;base64,'+pdf.documento;
    downloadLink.download = fileName;
    downloadLink.click();
 }
  
}
