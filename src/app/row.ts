
export class Row {
    index:number;
    style:string;
    components = [];
    
    constructor(public i:number){
        this.style = "p"
        this.index = i;
    }
}
