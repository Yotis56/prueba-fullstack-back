export interface Adquisiciones {
    presupuesto: number;
    unidad: string;
    tipo: string;
    cantidad: number;
    valorunitario: number;
    fechaadquisicion: Date;
    proveedor: string, 
    documentacion: string[];
}