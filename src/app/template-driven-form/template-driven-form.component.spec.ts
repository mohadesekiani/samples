import { TemplateDrivenFormComponent } from "./template-driven-form.component";

describe('SUT: TemplateDrivenFormComponent', () => {
  let sut: TemplateDrivenFormComponent;


  beforeEach(() => {
    sut = new TemplateDrivenFormComponent();
  });

  it('should be create', () => {
    expect(sut).toBeTruthy();
  })

})
