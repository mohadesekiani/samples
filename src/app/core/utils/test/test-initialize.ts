import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchFlightComponent } from 'src/app/search-flight/search-flight.component';
import { SearchTrainComponent } from 'src/app/search-train/search-train.component';
import { ValidationErrorService } from 'src/app/shared/services/validation-error.service';

export class TestInitialize {
  static componentsToTest = [SearchTrainComponent];
  static initializeTest(sut: any, formFields: Record<string, any>,path:string) {

    let fb = new FormBuilder();
    sut.form = fb.group(formFields);
    sut.ngOnInit()

  }
  static unitTestInitialize(sut: any, formFields: Record<string, any>,path:string) {
    this.componentsToTest.forEach((component) => {
      beforeEach(() => {
        let router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
        sut = new component(router);
        TestInitialize.initializeTest(sut,formFields,path);
      });
      it('should be have similar behavior for different components', () => {
        expect(sut).toBeTruthy();
        expect(sut.path).toBe('/result-train');
      });
    });
  }
}
