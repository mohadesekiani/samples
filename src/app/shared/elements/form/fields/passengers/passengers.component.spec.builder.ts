import { BaseBuilder } from "src/app/core/constant/base-unit-test/base-builder";
import { PassengerConst } from "src/app/core/module/interface/passenger-types.interface";
import { ISearchPassenger } from "src/app/core/module/interface/search-types.interface";
import { PassengersComponent } from "./passengers.component";

const sutConst = PassengerConst;

export class PassengersFormBuilder extends BaseBuilder<any>{

    override get some_data(): Partial<ISearchPassenger> {
        return sutConst.SomePassenger;
    }
    override get expected_default_form_value(): Partial<ISearchPassenger> {
        return sutConst.SomeInvalidPassenger
    }

    override build(): PassengersComponent {
        const sut = new PassengersComponent();
        this.afterBuild(sut);

        return sut;
    }
}