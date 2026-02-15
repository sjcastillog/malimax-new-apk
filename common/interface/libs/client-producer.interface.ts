import { ClientProducerFarmI } from "./client-producer-farm.interface";

export interface ClientProducerI{
    id?:number|null;
    uuid?:string;
    clientId?:number | null;
    client?:string|null;
    name:string;
    nameShort?:string;
    farms?:ClientProducerFarmI[];
}