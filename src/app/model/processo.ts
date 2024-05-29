export class Processo{

    id: number;
    npu: string;
    uf: string;
    municipio: string;
    dataCadastro: Date;
    dataVisualizacao: Date;
    documento: Blob;
    nomeDocumento: string;


    constructor(npu: string, 
                uf: string,
                municipio: string,
                dataCadastro: Date,
                documento: Blob,
                nomeDocumento: string){

        this.npu = npu;
        this.uf =  uf;
        this.municipio = municipio;
        this.dataCadastro = dataCadastro;
        this.documento = documento;
        this.nomeDocumento = nomeDocumento;
    }

}
