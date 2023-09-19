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
  multiPaths: any;
}
export interface ISearchPassenger {
  Adult: number;
  Child: number;
  Infant: number;
}
export interface ISearchMultiPaths {
  multiPaths:any;
}
