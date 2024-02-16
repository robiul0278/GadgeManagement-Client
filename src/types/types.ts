import { ReactNode } from 'react';

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
  hidden?: boolean;
};

export type TGadget = {
    key: string,
    _id: string;
    name: string,
    price:number ,
    quantity:number,
    brand:string,
    model_number:string,
    category: string,
    operating_system: string,
    connectivity: string,
    power_source:string ,
    features: string,
    isDeleted?: boolean,
    release_date: string,
    image?: string,
    itemQuantity?: number;
}


export type TSales = {
  key: string;
  _id: string;
  name: string;
  quantity: number;
  date: string;
}



export type DataType = {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}