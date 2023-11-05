import { ClassTypesEnum } from '../enum/class-types.enum';
import {
  ClassesTypesFlightEnum,
  GeneralTypesEnum,
} from '../enum/general-types.enum';
import { TravelTypesEnum } from '../enum/travel-types.enum';
import { ICity } from './city-type.interface';

export type IForm<T> = {
  [K in keyof T]?: any;
};

// export type IToAbstractControlMapper<T> = {
//   [K in keyof T]: AbstractControl<T[K]>;
// };
export interface ISearchResult {
  filter: IFilterFlight;
  result: ICity;
}

export interface ISearchFlight {
  passengers: ISearchPassenger;
  travelType: TravelTypesEnum;
  classType: ClassTypesEnum;
  routes: ISearchRoute[];
}
export interface ISearchTrain {
  route: ISearchRoute;
  travelType: TravelTypesEnum;
  passengers: ISearchPassenger;
  general: GeneralTypesEnum;
}
export interface IFilterFlight {
  timeRange: IRangeTime;
  priceRange: IRangePrice;
  class: any;
  airline: string;
  company: any;
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

export interface IClassFlight {
  Classy: boolean;
  CommercialGrade: boolean;
  EconomicGrade: boolean;
  PremiumGrade: boolean;
}

export interface ICompanyFlight {
  Mahan: boolean;
  Caspian: boolean;
  Chabahar: boolean;
}

export interface ISearchRoute {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate: Date;
}

export interface IClassFlightGroup {
  classy: ClassesTypesFlightEnum.Classy;
  commercialGrade: ClassesTypesFlightEnum.CommercialGrade;
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
// export interface IClassFlight {
//   classes: ClassTypesEnum[];
// }
// export interface IClassFlight {
//   classes: ClassesTypesFlightEnum[];
// }
// export interface ICompanyFlight {
//   companies: CompanyTypesFlightEnum[];
// }
