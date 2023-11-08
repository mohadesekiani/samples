import { MatButtonToggle } from "@angular/material/button-toggle";
import { MatRadioGroup } from "@angular/material/radio";
import { BasePage } from "src/app/core/constant/base-integration-test/base-page";
import { TestUtil } from "../../core/utils/test";
import { SearchTrainComponent } from "./search-train.component";


export class SearchTrainComponentPage extends BasePage<SearchTrainComponent>{
    constructor() {
        
        super(SearchTrainComponent);
    }

    get formCtrls() {
        return this.component.form.controls;
    }
    get routeCtrl() {
        return TestUtil.formControl(this.fixture, '#route');
    }
    get travelTypeCtrl() {
        return TestUtil.formControl(this.fixture, '#travelType');
    }
    get passengersCtrl() {
        return TestUtil.formControl(this.fixture, '#passengers');
    }
    get generalCtrl() {
        return TestUtil.formControl(this.fixture, '[item-id]="typeGeneral"');
    }
    get buttonToggles() {

        return TestUtil.directiveAllElement(this.fixture, MatButtonToggle);
    }
    get radio() { return TestUtil.directiveAllElement(this.fixture, MatRadioGroup); }
    get buttonElement() {
        return TestUtil.nativeElement<HTMLInputElement>(
            this.fixture,
            '#button'
        );
    }
    get showDropElement() { return TestUtil.nativeElement(this.fixture, '#showDrop'); }
    get radioButtons() {
        return TestUtil.queryAllElement(this.fixture, 'input[type=radio]');
    }
    get input() { return TestUtil.nativeElement<HTMLInputElement>(this.fixture, '#general') }
}