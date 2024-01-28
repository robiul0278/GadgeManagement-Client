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
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};


export type TSidebarItems = {
    key: string;
    label: ReactNode;
    children?: TSidebarItems[]
}


export type TGadget = {
    key: string,
    _id: string;
    name: string,
    price:number,
    quantity:number,
    brand:string,
    model_number:string,
    category: string,
    operating_system: string,
    connectivity: string,
    power_source:string ,
    features: string,
    isDeleted?: boolean,
}


export type TSales = {
  key: string;
  _id: string;
  name: string;
  quantity: number;
  date: string;
}