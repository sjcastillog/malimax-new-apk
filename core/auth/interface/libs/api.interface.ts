export interface ServiceResponseI<T>{
    statusCode?: number;
    data?: T;
    message?: string;
    res: Response;
    req: Request;
}

export interface DataI<T>{
    dato:Array<T>;
    total:number;
    page:number;
    totalPage:number;
}

export interface ObjResponseI<T>{
    data: T;
    message: string;
}

export interface AuthResponse {
  id: number;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
  user: string;
}

export interface ApiResponseI<T> {
  data: T;
  message: string;
}

export interface AuthResponseI {
  token: string;
  user: AuthResponse;
}

