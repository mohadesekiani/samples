import { PassengerTypesEnum } from "../enum/general-types.enum";

export type PassengerTypesType = Partial<{
  // use from keys
  [key in keyof typeof PassengerTypesEnum]: number;
  // use from values
  // [key in  PassengerTypesEnum]: number;
}>;

export interface IPassengerTypes extends PassengerTypesType {
}
