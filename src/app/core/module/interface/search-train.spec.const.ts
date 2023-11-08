import { GeneralTypesEnum } from "../enum/general-types.enum";
import { TravelTypesEnum } from "../enum/travel-types.enum";

export class SearchTrainConst {
    static get SomeSearchTrain() {
        return {
            route: {
                departureDate: new Date(),
                returnDate: new Date('2023/11/10'),
                origin: 'Abadan',
                destination: 'Abu Musa',
            },
            passengers: { Adult: 1, Child: 1, Infant: 1 },
            general: GeneralTypesEnum.General,
            travelType: TravelTypesEnum.OneWay,
        }
    }
    static get SomeInvalidSearchTrain() {
        return {
            route: null,
            passengers: { Adult: 1, Child: 1, Infant: 1 },
            general: GeneralTypesEnum.General,
            travelType: TravelTypesEnum.OneWay,
          }
    }
}