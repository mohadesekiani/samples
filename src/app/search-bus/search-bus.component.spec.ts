import { Router } from '@angular/router';
import { SearchBusComponent } from './search-bus.component';
import { ClassTypesEnum } from '../core/module/enum/class-types.enum';

fdescribe('SUT: SearchBusComponent', () => {
  let sut: SearchBusComponent;
  let router: jasmine.SpyObj<Router>
  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
    sut = new SearchBusComponent(router)
    sut.ngOnInit()
  });

  it('should be create', () => {
    expect(sut).toBeTruthy();
  });
  it('should be defualt value form', () => {
    debugger
    expect(sut.form.value).toEqual({
      routes: null,
      passengers: null,
      classBus: null
    })
  });

  it('should be have an error when the value is null', () => {
    sut.form.patchValue({
      routes: null,
    })
    expect(sut.form.controls.routes.hasError('required')).toBe(true)
  });

  it('should be when is valid form , redirect to `/result-bus`', () => {
    // arrange 
    sut.form.setValue({
      routes: [{
        departureDate: new Date(),
        returnDate: new Date('2023/11/10'),
        origin: 'Abadan',
        destination: 'Abu Musa',
      }],
      passengers:{Adult:1,Infant:1,Child:1},
      classBus:ClassTypesEnum.Business
    })
    // act 
    sut.submit()

    // assert 
    expect(router.navigate).toHaveBeenCalledWith(['/result-bus'])
  });

  it('should be when is inValid form', () => {
    // act 
    sut.submit()

    // assert 
    expect(sut.form.dirty).toBeTruthy()
    expect(sut.form.touched).toBeTruthy()
  });

});
