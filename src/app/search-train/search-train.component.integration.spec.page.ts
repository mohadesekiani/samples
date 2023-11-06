import { TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { SearchTrainComponent } from "./search-train.component";
import { AbstractDataService } from "../core/services/data/abstract-data.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestUtil } from "../core/utils/test";

export class SearchTrainComponentPage {
    fixture: any;
    component!: SearchTrainComponent;

    constructor() {
        this.init();
    }

    init() {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                SharedModule,
                FormsModule,
                BrowserModule,
                RouterTestingModule,
            ],
            declarations: [SearchTrainComponent],
            providers: [AbstractDataService],
            schemas: [NO_ERRORS_SCHEMA],
        });

        this.fixture = TestBed.createComponent(SearchTrainComponent);
        this.component = this.fixture.componentInstance;

        this.fixture.detectChanges();
    }

    detectChanges() {
        this.fixture.detectChanges();
        return this;
    }

    get formCtrls() {
        return this.component.form.controls;
    }
    get formEl() {
        return TestUtil.formGroup(this.fixture, 'form');
    }
    get routeCtrl() {
        return TestUtil.formControl(this.fixture, '#route');
    }
    get travelTypeCtrl() {
        return TestUtil.formControl(this.fixture, '#travelType');
    }
    get passengersCtrl() {
        return TestUtil.formControl(this.fixture, '#passengers');
    }

}