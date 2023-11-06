import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatRadioGroup } from '@angular/material/radio';
import { TestUtil } from '../core/utils/test';
import { SearchTrainComponentPage } from './search-train.component.integration.spec.page';

fdescribe('SUT(Integration): SearchTrainComponent', () => {
  let sutPage: SearchTrainComponentPage;

  beforeEach(() => {
    sutPage = new SearchTrainComponentPage();
  });

  it('should be create', () => {
    // assert
    expect(sutPage.detectChanges()).toBeTruthy();
  });

  it('should be binding formControlName', () => {
    // arrange
    sutPage.detectChanges();

    // assert
    expect(sutPage.component.form).toBe(sutPage.formEl.form);
    expect(sutPage.formCtrls.route).toBe(sutPage.routeCtrl.control);
    expect(sutPage.formCtrls.travelType).toBe(sutPage.travelTypeCtrl.control);
    expect(sutPage.formCtrls.passengers).toBe(sutPage.passengersCtrl.control);

    // expect(sut.form.controls.general).toBe(generalCtrl.control);
  });

  // fit(`should be call #toggleDropDown when button clicked`, () => {

  //   // arrange
  //   spyOn(sut, 'toggleDropDown');

  //   // action
  //   btnPassenger.click();

  //   // assert
  //   expect(sut.toggleDropDown).toHaveBeenCalled();
  // });

  // it('should be binding value', () => {
  //   // arrange
  //   sut.showDrop = true;
  //   const buttonToggles = TestUtil.directiveAllElement(
  //     fixture,
  //     MatButtonToggle
  //   );
  //   const radio = TestUtil.directiveAllElement(fixture, MatRadioGroup);
  //   const buttonElement = TestUtil.nativeElement<HTMLInputElement>(
  //     fixture,
  //     '#button'
  //   );
  //   const showDropElement = TestUtil.nativeElement(fixture, '#showDrop');

  //   // const input = TestUtil.nativeElement<HTMLInputElement>(fixture, '#general');
  //   const radioButtons = TestUtil.queryAllElement(
  //     fixture,
  //     'input[type=radio]'
  //   ); /*?*/

  //   // act
  //   spyOn(sut, 'submit');
  //   fixture.detectChanges();

  //   // assert
  //   expect(buttonToggles.length).toBe(sut.travelTypes.length);
  //   buttonToggles.forEach((buttonToggle, index) => {
  //     expect(buttonToggle.componentInstance.value).toBe(
  //       sut.travelTypes[index].value
  //     );
  //   });
  //   expect(sut.submit).toHaveBeenCalled();
  //   expect(sut.showDrop).toBeTruthy();
  //   expect(buttonElement.type).toBe('submit');
  //   // expect(input.type).toBe('radio');
  // });
});
