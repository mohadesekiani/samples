import { MatButtonToggle } from "@angular/material/button-toggle";
import { BasePage } from "src/app/core/constant/base-integration-test/base-page";
import { TestUtil } from "../../core/utils/test";
import { SearchFlightComponent } from "./search-flight.component";

export class SearchFlightComponentPage extends BasePage<SearchFlightComponent>{
    constructor() {
        super(SearchFlightComponent);
        spyOn(this.component, 'submit');

    }

    get formEl() {
        return TestUtil.formGroup(this.fixture, 'form');
    }
    get routesCtrl() {
        return TestUtil.formControl(this.fixture, '#routes')
    }
    get travelTypeCtrl() {
        return TestUtil.formControl(this.fixture, '#travelType');
    }
    get passengersCtrl() {
        return TestUtil.formControl(this.fixture, '#passengers');
    }
    get classCtrl() {
        return TestUtil.formControl(this.fixture, '#class');
    }
    get buttonToggles() {
        return TestUtil.directiveAllElement(this.fixture, MatButtonToggle);
    }
    get ariaLabel() {
        return TestUtil.querySelector(this.fixture, 'mat-radio-group').getAttribute('aria-label');
    }
    get submitElement() {
        return TestUtil.nativeElement<HTMLInputElement>(this.fixture, '#submit');
    }
}