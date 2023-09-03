import { FormBuilder } from "@angular/forms";
import { ReactiveFormComponent } from "./reactive-form.component";

fdescribe('SUT: TemplateDrivenFormComponent', () => {
  let sut: ReactiveFormComponent;
  let fb: FormBuilder;


  beforeEach(() => {
    fb = new FormBuilder();
    sut = new ReactiveFormComponent(fb);
  });

  fit('should be create', () => {
    expect(sut).toBeTruthy();
    //expect(sut.options).toEqual(['First', 'Business', 'Economy', 'Premium']);
    expect(sut.options).toEqual([
                                 {title:'First Class',value:'FirstClass'},
                                 {title:'Business',value:'Business'},
                                 {title:'Economy',value:'Economy'},
                                 {title:'Premium Class',value:'PremiumClass'}
                                ]);
  })
  it('should create the cityForm with expected controls and validators', () => {
    const cityForm = sut.cityForm;
    const cityInput = cityForm.get('cityInput');
    const origin = cityForm.get('origin');
    const destination = cityForm.get('destination');
    const returnDate = cityForm.get('returnDate');
    const departureDate = cityForm.get('departureDate');
  })
})
