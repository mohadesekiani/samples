// import { PassengerTypesEnum } from "./general-types.enum";

// type EnumKeys = keyof typeof PassengerTypesEnum;
export interface IPassengerTypes {
  // [key in keyof typeof  PassengerTypesEnum]: number;
  // [ket: string]: number;
  Adult: number;
  Child: number;
  Infant: number;
}
