import { SearchTrainComponentPage } from './search-train.component.integration.spec.page';

describe('SUT(Integration): SearchTrainComponent', () => {
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
    spyOn(sutPage.component, 'toggleDropDown');
    sutPage.detectChanges();

    // act
    sutPage.showDropElement.click();

    // assert
    expect(sutPage.component.form).toBe(sutPage.formEl.form);
    expect(sutPage.formCtrls.route).toBe(sutPage.routeCtrl.control);
    expect(sutPage.formCtrls.travelType).toBe(sutPage.travelTypeCtrl.control);
    expect(sutPage.formCtrls.passengers).toBe(sutPage.passengersCtrl.control);
    // expect(sutPage.formCtrls.general).toBe(sutPage.generalCtrl.control);
  });

  it(`should be call #toggleDropDown when button clicked`, () => {

    // arrange
    spyOn(sutPage.component, 'toggleDropDown');

    // act
    sutPage.showDropElement.click();

    // assert
    expect(sutPage.component.toggleDropDown).toHaveBeenCalled();
  });

  it('should be binding value', () => {
    // arrange
    spyOn(sutPage.component, 'submit');
    sutPage.detectChanges();

    // act 
    sutPage.buttonElement.click()

    // assert
    expect(sutPage.buttonToggles.length).toBe(sutPage.component.travelTypes.length);
    sutPage.buttonToggles.forEach((buttonToggle, index) => {
      expect(buttonToggle.componentInstance.value).toBe(
        sutPage.component.travelTypes[index].value
      );
    });
    expect(sutPage.component.submit).toHaveBeenCalled();
    expect(sutPage.buttonElement.type).toBe('submit');
    // expect(sutPage.input.type).toBe('radio');
  });
});
