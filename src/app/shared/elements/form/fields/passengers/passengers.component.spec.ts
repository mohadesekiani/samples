import { PassengersComponent } from './passengers.component';
import { PassengersFormBuilder } from './passengers.component.spec.builder';

fdescribe('SUT: PassengersComponent', () => {
  let sut: PassengersComponent;
  let sutBuilder: PassengersFormBuilder;

  beforeEach(() => {
    sutBuilder = new PassengersFormBuilder();
  });

  it('should be create', () => {
    // arrange 
    sut = sutBuilder.build(PassengersComponent);

    // assert
    expect(sut).toBeTruthy();
  });

  it('should be created form with default value', () => {
    // arrange 
    sut = sutBuilder.build(PassengersComponent);

    // assert
    expect(sut.form.value).toEqual({ Adult: null, Child: null, Infant: null });
  });

  it('should be not set required error to passenger controller when passenger is empty', () => {
    // arrange
    sut = sutBuilder.with_data_for_form({ Adult: null, Child: null, Infant: null } as any).build(PassengersComponent);

    // assert
    expect(sut.form.controls.Adult?.hasError('required')).toBeTrue();
  });

  it('should be not set required error to passengers controller when passengers has proper value', () => {
    // arrange
    sut = sutBuilder.with_data_for_form({ Adult: 1, Child: 1, Infant: 1 } as any).build(PassengersComponent);

    // assert
    expect(sut.form?.hasError('required')).toBeFalse();
  });

  it(`should set max error on Infant when is greater than Adult in simple way`, () => {
    // arrange
    sut = sutBuilder.with_data_for_form({ Adult: null, Child: null, Infant: 1 } as any).build(PassengersComponent);

    // action
    sut = sutBuilder.with_data_for_form({ Adult: null, Child: null, Infant: 3 } as any).build(PassengersComponent);

    // assert
    expect(sut.form.controls.Infant?.hasError('max')).toBeTrue();
  });

  it(`should set max error on Infant when is greater than Adult in advance way`, () => {
    // arrange
    sut = sutBuilder.with_data_for_form({ Adult: 1, Child: null, Infant: 3 } as any).build(PassengersComponent);

    // act
    sut = sutBuilder.with_data_for_form({ Adult: 1, Child: null, Infant: 2 } as any).build(PassengersComponent);

    // assert
    expect(sut.form.controls.Infant?.hasError('max')).toBeTrue();

  });

  it(`should not set max error on Infant when is equal or less than Adult`, () => {
    // arrange
    sut = sutBuilder.with_data_for_form({ Adult: 1, Child: null, Infant: 3 } as any).build(PassengersComponent);

    // act
    sut = sutBuilder.with_data_for_form({ Adult: 3, Child: null, Infant: 3 } as any).build(PassengersComponent);

    // assert
    expect(sut.form.controls.Infant.invalid).toBeFalse();
    expect(sut.form.controls.Infant.hasError('max')).toBeFalsy();
  });
});
