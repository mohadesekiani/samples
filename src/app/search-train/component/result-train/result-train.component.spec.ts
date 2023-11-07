import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTrainComponent } from './result-train.component';

describe('ResultTrainComponent', () => {
  let component: ResultTrainComponent;
  let fixture: ComponentFixture<ResultTrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultTrainComponent]
    });
    fixture = TestBed.createComponent(ResultTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
