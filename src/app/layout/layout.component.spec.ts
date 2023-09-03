import { LayoutComponent } from "./layout.component";

describe('SUT: LayoutComponent', () => {
  let sut: LayoutComponent;

  beforeEach(() => {
    sut = new LayoutComponent();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  })
});
