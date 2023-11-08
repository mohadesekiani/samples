import { BaseForm } from "../base-component/base-form";
import { BaseBuilder } from "./base-builder";

export function BaseFormTestFunc(sutBuilderFactory: () => BaseBuilder<any>) {
    let sut: BaseForm<any>;
    let sutBuilder: BaseBuilder<any>;

    beforeEach(() => {
        sutBuilder = sutBuilderFactory();
    })

    it('should create', () => {
        const sut = sutBuilder.build();

        // assert
        expect(sut).toBeTruthy();
    });

    it(`should create #form with proper value when #ngOnInit() called`, () => {

        // arrange
        sut = sutBuilder.build();

        // assert
        expect(sut.form.value).toEqual(sutBuilder.expected_default_form_value);
    });

    it('should be create form with default value', () => {
        // arrange
        sut = sutBuilder.with_some_data_for_form().build();

        // act 
        sut.submit();

        // assert
        expect(sutBuilder.router.navigate).toHaveBeenCalled();
        expect(sutBuilder.router.navigate).toHaveBeenCalledWith([]);
    });

}

