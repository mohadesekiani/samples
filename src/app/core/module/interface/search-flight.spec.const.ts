import { ClassTypesEnum } from "../enum/class-types.enum";
import { TravelTypesEnum } from "../enum/travel-types.enum";
import { ISearchFlight } from "./search-types.interface";

export class SearchFlightConst {
    
    static get SomeSearchFlight(): ISearchFlight {
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
    static get SomeInvalidSearchFlight(): ISearchFlight {
        return {
            routes: null,
            classType: ClassTypesEnum.Business,
            passengers: { Adult: 1, Child: 1, Infant: 1 },
            travelType: TravelTypesEnum.OneWay,
        }
    }
}