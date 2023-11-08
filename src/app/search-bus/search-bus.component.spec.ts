import { SearchBusComponent } from './search-bus.component';

fdescribe('SUT: SearchBusComponent', () => {
  let sut: SearchBusComponent;

  beforeEach(() => {
    sut = new SearchBusComponent()
  });

  it('should be create', () => {
    expect(sut).toBeTruthy();
  });
});
