export interface Adquisiciones {
    presupuesto: number;
    unidadResponsable: string;
    tipo: string;
    cantidad: number;
    valorUnitario: number;
    valorTotal: number;
    fechaAdquisicion: Date;
    proveedor: string, 
    documentacion: string[];
}