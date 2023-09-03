import { FormBuilder } from "@angular/forms";
import { ReactiveFormComponent } from "./reactive-form.component";
import { ClassTypesEnum } from "../models/class-types.enum";
import { TravelTypesEnum } from "../models/travel-types.enum";

fdescribe('SUT: ReactiveFormComponent', () => {
  let sut: ReactiveFormComponent;
  let fb: FormBuilder;


  beforeEach(() => {
    fb = new FormBuilder();
    sut = new ReactiveFormComponent(fb);
    sut.today = new Date()
    sut.ngOnInit()
  });

  it('should be create', () => {
    expect(sut).toBeTruthy();
    //expect(sut.options).toEqual(['First', 'Business', 'Economy', 'Premium']);
    expect(sut.classTypes).toEqual([
      { title: 'First Class', value: ClassTypesEnum.FirstClass },
      { title: 'Business', value: ClassTypesEnum.Business },
      { title: 'Economy', value: ClassTypesEnum.Economy },
      { title: 'Premium Class', value: ClassTypesEnum.PremiumClass }
    ]);
  });

  it('should be create form with defualt value', () => {
    // arrange
    const expectedFormValue = {
      departureDate: sut.today,
      returnDate: null,
      origin: null,
      destination: null,
      classType: null
    }
    // assert
    expect(sut.flightForm.value).toEqual(expectedFormValue);
    // TODO how check returnDate
  });
  //TODO add test same top test with proper value

  it('should create the cityForm with expected controls and validators', () => {
    const cityForm = sut.flightForm;
    const cityInput = cityForm.get('cityInput');
    const origin = cityForm.get('origin');
    const destination = cityForm.get('destination');
    const returnDate = cityForm.get('returnDate');
    const departureDate = cityForm.get('departureDate');
  })

  it('should be set required error to origin controller when origin is empty', ()=>{
    // arrange
    const origin = sut.flightForm.get('origin');
    // act
    origin?.setValue(null);
    // assert
    expect(origin?.hasError('required')).toBeTrue();
  });

  it('should be enabled returnDate controller when travelType is RoundTrip', ()=>{
    // arrange
    const travelType = sut.flightForm.get('travelType');
    const returnDate = sut.flightForm.get('returnDate');
    
    // act
    travelType?.setValue(TravelTypesEnum.RoundTrip);
    
    // assert
    expect(returnDate?.enabled).toBeTrue();
  })
})
