
import { ButtonToggleComponentPage } from './button-toggle.component.integration.spec.page';

fdescribe('SUT(Integration): ButtonToggleComponent', () => {
    let sutPage: ButtonToggleComponentPage;

    beforeEach(() => {
        sutPage = new ButtonToggleComponentPage()
    });

    it('should be create', () => {
        // assert
        expect(sutPage.detectChanges()).toBeTruthy();
    });

    xit('should be binding formControl and formGroup', () => {
        // arrange 
        sutPage.detectChanges();
        debugger
        // sutPage.buttonToggle is null

        // act
        // sutPage.buttonToggle.click()

        // assert 
        expect(sutPage.component.onValueChange).toHaveBeenCalledWith({ value: 'example', title: 'Example' });

    });
});
