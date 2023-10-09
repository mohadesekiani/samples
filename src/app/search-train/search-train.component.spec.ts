import { SearchTrainComponent } from "./search-train.component";

describe('SUT: SearchTrainComponent', () => {
  let sut: SearchTrainComponent;


  beforeEach(() => {
    sut = new SearchTrainComponent();
  });

  it('should be create', () => {
    expect(sut).toBeTruthy();
  })

})
