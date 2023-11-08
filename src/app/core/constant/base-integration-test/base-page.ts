import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AbstractDataService } from "../../services/data/abstract-data.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestUtil } from "../../utils/test";

export abstract class BasePage<T>{
    fixture!: ComponentFixture<T>;
    component!: T;
    constructor(componentType: any, additionalConfig: any = {}) {
        this.init(componentType, additionalConfig);
    }

    init(componentType: any, additionalConfig: any = {}) {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                SharedModule,
                BrowserModule,
                FormsModule,
                RouterModule,
                ...additionalConfig.imports || [],
            ],
            declarations: [componentType],
            providers: [AbstractDataService, ...additionalConfig.providers || [],],
            schemas: [NO_ERRORS_SCHEMA],
        })
        this.fixture = TestBed.createComponent(componentType);
        this.component = this.fixture.componentInstance;
        this.fixture.detectChanges();
    }

    detectChanges() {
        this.fixture.detectChanges();
        return this;
    }

    get formEl() {
        return TestUtil.formGroup(this.fixture, 'form');
    }
    

}