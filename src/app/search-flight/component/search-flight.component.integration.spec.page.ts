import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { SearchFlightComponent } from "./search-flight.component";
import { SharedModule } from "../../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { AbstractDataService } from "../../core/services/data/abstract-data.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestUtil } from "../../core/utils/test";
import { MatButtonToggle } from "@angular/material/button-toggle";

export class SearchFlightComponentPage {
    fixture: any;
    component!: SearchFlightComponent;

    constructor() {
        this.init()
        spyOn(this.component, 'submit');
    }

    init() {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                SharedModule,
                BrowserModule,
                FormsModule,
                RouterModule,
            ],
            declarations: [SearchFlightComponent],
            providers: [AbstractDataService],
            schemas: [NO_ERRORS_SCHEMA],
        })
        this.fixture = TestBed.createComponent(SearchFlightComponent);
        this.component = this.fixture.componentInstance;
        this.fixture.detectChanges();

    }
    detectChanges() {
        this.fixture.detectChanges();
        return this;
    }

    get formEl() {
        return TestUtil.formGroup(this.fixture, 'form')
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
    get buttonElement() {
        return TestUtil.nativeElement<HTMLInputElement>(this.fixture, '#button');
    }
}