import { PassengersComponent } from "./passengers";

describe('SUT: PassengersComponent', () => {
  let sut: PassengersComponent;


  beforeEach(() => {
    sut = new PassengersComponent();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  })
});
