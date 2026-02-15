export interface UserI {
  id: number;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  user: string;
}

export interface UsersLoginResponseI {
  token: string;
  user: UsersLoginDataResponseI;
  cachedAt?: string;
}

export interface UsersLoginDataResponseI {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  coordinatorId: number;
  coordinatorName: string;
  typeDashboardCode: any;
  areaId: string;
  mail: string;
  typeId: number;
  profileId: string;
  avatar?: string;
  pathLogin?: string;
  // modules: ModuleI[];
  clientId: number | null;
  client: string | null;
  nameSort: string;
  modules: ModuleI[];
}

export interface ModuleI {
  id: number;
  name: string;
  nameSort: any;
  parentModuleId: number | null;
  children: ModuleI[];
  code: any;
}
