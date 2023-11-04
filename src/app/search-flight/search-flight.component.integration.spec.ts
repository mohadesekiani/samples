import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SearchFlightComponent } from "./search-flight.component";
import { IForm, ISearchFlight } from "../core/module/interface/search-types.interface";
import { FormGroup, FormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AbstractDataService } from "../core/services/data/abstract-data.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestUtil } from "../core/utils/test";


describe('SUT(Integration): SearchFlightComponent', () => {
  let sut: SearchFlightComponent;
  let fixture: ComponentFixture<SearchFlightComponent>;
  let form: FormGroup<IForm<ISearchFlight>>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        BrowserModule,
        FormsModule,
        NoopAnimationsModule,
        SharedModule,
        RouterModule,
      ],
      declarations: [SearchFlightComponent],
      providers: [AbstractDataService],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(SearchFlightComponent);
    sut = fixture.componentInstance;
    form = sut.form;
    fixture.detectChanges();
    try {
      
    } catch (error) {
      
    }
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  //FIXME with mr mirzaei
  it('should bind aria-label', () => {
    // arrange
    const radioGroup =TestUtil.querySelector(fixture,'mat-radio-group');
      const ariaLabel = radioGroup.getAttribute('aria-label');
    // act
    fixture.detectChanges();

    // assert
    expect(ariaLabel).toBe('Select an option');
  });
});
