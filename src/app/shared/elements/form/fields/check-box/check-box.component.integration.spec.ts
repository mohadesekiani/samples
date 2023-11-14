import { checkBoxComponentPage } from "./check-box.component.integration.spec.page"

describe('SUT(Integration): CheckBoxComponent', () => {
    let sutPage: checkBoxComponentPage
    beforeEach(() => {
        sutPage = new checkBoxComponentPage()
    });

    it('should be create', () => {
        // assert
        expect(sutPage.detectChanges()).toBeTruthy();
    });

    it('should be binding', () => {

        // act
        sutPage.checkboxEl.click();

        // assert 
        expect(sutPage.checkboxEl.type).toBe('checkbox')
        expect(sutPage.component.onCheckboxChange).toHaveBeenCalled()
    });


})