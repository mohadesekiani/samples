import { BaseBuilder } from "src/app/core/constant/base-unit-test/base-builder";
import { ISearchFlight } from "../../core/module/interface/search-types.interface";
import { SearchFlightComponent } from "./search-flight.component";
import { TravelTypesEnum } from "src/app/core/module/enum/travel-types.enum";
import { SearchFlightConst } from "src/app/core/module/interface/search-flight.spec.const";

const sutConst = SearchFlightConst;

export class SearchFlightFormBuilder extends BaseBuilder<SearchFlightComponent>{
    override get some_data(): Partial<ISearchFlight> {
        return sutConst.SomeSearchFlight;
    }
    override get expected_default_form_value(): Partial<ISearchFlight> {
        return {
            routes: null,
            passengers: null,
            travelType: TravelTypesEnum.OneWay,
            classType: null,
        }
    }

    override build(): SearchFlightComponent {
        const sut = new SearchFlightComponent(this.router);
        this.afterBuild(sut);

        return sut;
    }

}