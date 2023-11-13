import { BasePage } from "src/app/core/constant/base-integration-test/base-page";
import { CheckBoxComponent } from "./check-box.component";
import { TestUtil } from "src/app/core/utils/test";

export class checkBoxComponentPage extends BasePage<CheckBoxComponent> {
    constructor() {
        super(CheckBoxComponent)
        spyOn(this.component, 'onCheckboxChange')
    }

    get checkboxEl() {
        return TestUtil.nativeElement<HTMLInputElement>(this.fixture, '#checkbox')
    }



}