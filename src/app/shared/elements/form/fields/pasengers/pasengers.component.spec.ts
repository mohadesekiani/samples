import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasengersComponent } from './pasengers.component';

describe('PasengersComponent', () => {
  let component: PasengersComponent;
  let fixture: ComponentFixture<PasengersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasengersComponent]
    });
    fixture = TestBed.createComponent(PasengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('#increase() should toggle #incriment', () => {
      const comp = new PasengersComponent();
      let item = 1;
      expect(comp.passanger[item].value)
        .toBe(0);
      comp.increase(item)
      expect(comp.passanger[item].value)
        .toBe(1);

    });


});
