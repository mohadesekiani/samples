import { BasePage } from "src/app/core/constant/base-integration-test/base-page";
import { ButtonToggleComponent } from "./button-toggle.component";
import { TestUtil } from "src/app/core/utils/test";
import { MatButtonToggle } from "@angular/material/button-toggle";

export class ButtonToggleComponentPage extends BasePage<ButtonToggleComponent>{
    constructor() {
        super(ButtonToggleComponent)
        spyOn(this.component, 'onValueChange')
    }

    get buttonToggles() {
        return TestUtil.directiveAllElement(this.fixture, MatButtonToggle);
    }
    get buttonToggle() {
        return TestUtil.nativeElement(this.fixture, '[item-id=OneWay]');
    }
}