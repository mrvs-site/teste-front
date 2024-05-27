export class Processo{

    id: number;
    npu: string;
    uf: string;
    municipio: string;
    dataCadastro: Date;
    dataVisualizacao: Date;
    documento: Blob;


    constructor(npu: string, 
                uf: string,
                municipio: string,
                dataCadastro: Date,
                documento: Blob){

        this.npu = npu;
        this.uf =  uf;
        this.municipio = municipio;
        this.dataCadastro = dataCadastro;
        this.documento = documento;
    }

}
