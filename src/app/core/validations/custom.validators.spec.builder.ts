import { FormBuilder } from "@angular/forms";
import { CustomValidators } from "./custom.validators";

export class customValidatorsBuilder {

    formValue!: any;
    routesCtrl!: any
    constructor(private fb: FormBuilder) {
    }
    form_Validation_length() {
        this.formValue = this.fb.group({
            routes: this.fb.array([
                this.fb.group({ origin: ['mm'] }),
                this.fb.group({ origin: ['mmm'] })
            ])
        }, {
            validators: [CustomValidators.atLeseNumber('routes', 3)],

        })
        this.routesCtrl = this.formValue.controls.routes
        return this
    }
    form_Validation_unique() {
        this.formValue = this.fb.group({
            routes: this.fb.array([
                this.fb.group({ origin: [null] }),
                this.fb.group({ origin: [null] })
            ])
        }, {
            validators: [CustomValidators.unique('routes', 'origin')],

        })
        return this
    }
    build() {
        if (this.formValue) {
            this.formValue.patchValue(this.formValue);
        }
        return this.formValue;
    }

}