// import { PassengerTypesEnum } from "./general-types.enum";

// type EnumKeys = keyof typeof PassengerTypesEnum;
export interface IPassengerTypes {
  // [key in keyof typeof  PassengerTypesEnum]: number;
  // [ket: string]: number;
  adult: number;
  child: number;
  infant: number;
}
