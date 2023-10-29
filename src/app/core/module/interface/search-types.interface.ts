import { ClassTypesEnum } from '../enum/class-types.enum';
import { ClassesTypesFlightEnum } from '../enum/general-types.enum';
import { TravelTypesEnum } from '../enum/travel-types.enum';

export type IForm<T> = {
  [K in keyof T]?: any;
};

// export type IToAbstractControlMapper<T> = {
//   [K in keyof T]: AbstractControl<T[K]>;
// };

export interface ISearchFlight {
  passengers: ISearchPassenger;
  travelType: TravelTypesEnum;
  classType: ClassTypesEnum;
  routes: ISearchRoute[];
}
export interface IFilterFlight {
  timeRange: IRangeTime;
  priceRange: IRangePrice;
  class: any;
  airline: string;
}
export interface IRangeTime {
  startTime: number;
  endTime: number;
}
export interface IRangePrice {
  minPrice: number;
  maxPrice: number;
}
export interface ISearchPassenger {
  Adult: number;
  Child: number;
  Infant: number;
}

export interface ISearchRoute {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate: Date;
}

export interface ISearchMultiPath {
  routes: any;
  //  FormArray<FormGroup<IForm<ISearchRoute>>>;
}

export interface ITab {
  title: string;
  active: boolean;
  route: string;
}
