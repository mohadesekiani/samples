import { PassengerTypesEnum } from "../enum/general-types.enum";

export type PassengerTypesType = Partial<{
  // use from keys
  [key in keyof typeof PassengerTypesEnum]: number;
  // use from values
  // [key in  PassengerTypesEnum]: number;
}>;

export interface IPassengerTypes extends PassengerTypesType { }
export class PassengerConst {
  static get SomePassenger() {
    return {
      Adult: 1,
      Child: 1,
      Infant: 1,
    }
  }
  static get SomeInvalidPassenger() {
    return {
      Adult: 0,
      Child: 0,
      Infant: 1,
    }
  }
}