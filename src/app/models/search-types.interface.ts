import { TravelTypesEnum } from "./travel-types.enum";

export type IForm<T> = {
  [K in keyof T]?: any;
};
export interface ISearchFlight {
  passengers: any;
  travelType: any;
  departureDate: any;
  returnDate: any;
  origin: any;
  destination: any;
  classType: any;
  routes: any;
}
export interface ISearchPassenger {
  Adult: number;
  Child: number;
  Infant: number;
}
export interface ISearchMultiPath {
  travelType:TravelTypesEnum;
  routes:any;
}
