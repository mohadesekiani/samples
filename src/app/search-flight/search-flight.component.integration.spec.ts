import { SearchFlightComponentPage } from './search-flight.component.integration.spec.page';

fdescribe('SUT(Integration): SearchFlightComponent', () => {
  let sutPage: SearchFlightComponentPage

  beforeEach(() => {
    sutPage = new SearchFlightComponentPage();
  });

  it('should be create', () => {
    expect(sutPage.detectChanges()).toBeTruthy();
  });

  it('should be binding formControlName', () => {
    // arrange
    sutPage.detectChanges();

    // assert
    expect(sutPage.component.form).toBe(sutPage.formEl.form);
    expect(sutPage.component.form.controls.routes).toBe(sutPage.routesCtrl.control);
    expect(sutPage.component.form.controls.travelType).toBe(sutPage.travelTypeCtrl.control);
    expect(sutPage.component.form.controls.passengers).toBe(sutPage.passengersCtrl.control);
    expect(sutPage.component.form.controls.classType).toBe(sutPage.classCtrl.control);
  });

  it('should bind aria-label', () => {
    // arrange
    sutPage.detectChanges();

    // act
    spyOn(sutPage.component, 'submit');
    sutPage.buttonElement.click();

    // assert
    expect(sutPage.buttonToggles.length).toBe(sutPage.component.travelTypes.length);
    sutPage.buttonToggles.forEach((buttonToggle, index) => {
      expect(buttonToggle.componentInstance.value).toBe(
        sutPage.component.travelTypes[index].value
      );
    });
    expect(sutPage.ariaLabel).toBe('Select an option');
    expect(sutPage.component.submit).toHaveBeenCalled();
    expect(sutPage.buttonElement.type).toBe('submit');
  });
});
