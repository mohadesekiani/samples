import { LayoutComponent } from "./layout.component";

fdescribe('SUT: LayoutComponent', () => {
  let sut: LayoutComponent;

  beforeEach(() => {
    sut = new LayoutComponent();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  })

  fit('should be when you click on the tab, the tab becomes active', () => {
   let tabs = [
      { title: 'Flight', active: true ,route:'/'},
      { title: 'Train', active: false ,route:'Train'},
    ];
    
    sut.activateTab(tabs[0])
    expect(tabs[0].active).toBe(true)
    expect(tabs[1].active).toBe(false)
  });
  
});
