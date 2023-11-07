import { Router } from "@angular/router";
import { ISearchFlight } from "../../core/module/interface/search-types.interface";
import { SearchFlightComponent } from "./search-flight.component";
import { TravelTypesEnum } from "../../core/module/enum/travel-types.enum";
import { ClassTypesEnum } from "../../core/module/enum/class-types.enum";
import { SearchFlightConst } from "../../core/module/interface/search-flight.spec.const";

export class SearchFlightFormBuilder {
    router: jasmine.SpyObj<Router>
    formValue!: ISearchFlight;
    passengerCtrl: any
    routesCtrl: any
    classTypeCtrl: any

    constructor() {
        this.router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
    }

    with_data_for_form(value:ISearchFlight): SearchFlightFormBuilder {
        this.formValue = value;
        return this;
    }

    with_some_valid_data_for_form(): SearchFlightFormBuilder {
        this.with_data_for_form(SearchFlightConst.SomeSearchFlight);
        return this;
    }

    with_some_invalid_data_for_form(): SearchFlightFormBuilder {
        this.with_data_for_form({
            routes: null,
            classType: ClassTypesEnum.Business,
            passengers: { Adult: 1, Child: 1, Infant: 1 },
            travelType: TravelTypesEnum.OneWay,
        });
        return this;
    }

    build(): SearchFlightComponent {
        const sut = new SearchFlightComponent(this.router)

        sut.ngOnInit();

        if (this.formValue) {
            sut.form.patchValue(this.formValue);
        }

        return sut;
    }
}