import { AppComponent } from "./app.component";

describe('SUT: AppComponent', () => {
  let sut: AppComponent;

  beforeEach(() => {
    sut = new AppComponent();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  })
});
