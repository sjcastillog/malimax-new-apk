export interface CatalogueI{
    id:number;
    code:string;
    description: string;
    reference: string;
    name:string;
    parentCatalogueId?:number;
    parentCatalogue?:string;
}