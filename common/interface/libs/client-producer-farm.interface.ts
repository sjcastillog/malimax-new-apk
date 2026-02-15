export interface ClientProducerFarmI{
    id?:number;
    uuid?:string;
    clientId?:number|null;
    client?:string|null;
    clientProducerId?:number|null;
    clientProducer?:string|null;
    name:string;
    nameShort?:string;
    zone:string;
    balerCode:string;
}