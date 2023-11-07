import { ClassTypesEnum } from "../enum/class-types.enum";
import { TravelTypesEnum } from "../enum/travel-types.enum";

export class SearchFlightConst {
    static get SomeSearchFlight() {
        return {
            routes: [{
                departureDate: new Date(),
                returnDate: new Date('2023/11/10'),
                origin: 'Abadan',
                destination: 'Abu Musa',
            }],
            classType: ClassTypesEnum.Business,
            passengers: { Adult: 1, Child: 1, Infant: 1 },
            travelType: TravelTypesEnum.OneWay,
        }
    }

}