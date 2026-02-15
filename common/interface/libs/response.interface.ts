export interface ServiceResponseI<T> {
  statusCode?: number;
  data?: T;
  message?: string;
  res: Response;
  req: Request;
  isOffline?: boolean;
}

export interface ObjResponseI<T> {
  data: T;
  message: string;
}

type variants =
  | "default"
  | "error"
  | "success"
  | "warning"
  | "info"
  | undefined;
  
export interface ObjPostI {
  alert: string;
  id: number;
  variant?: variants;
  // ✅ NUEVOS campos
  existed?: boolean; // Para indicar si ya existía
  created?: boolean; // Para indicar si fue creado nuevo
  originalDate?: string; // Fecha original si ya existía
  status?: string; // Estado del contenedor existente
}