import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ClassTypesEnum } from './class-types.enum';
import { TravelTypesEnum } from './travel-types.enum';

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

export interface ISearchPassenger {
  Adult: number;
  Child: number;
  Infant: number;
}

export interface ISearchRoute {
  origin: string | null;
  destination: string | null;
  departureDate: Date | null;
  returnDate: Date | null;
}

export interface ISearchMultiPath {
  routes: any;
}

export interface ITab {
  title: string;
  active: boolean;
  route: string;
}
