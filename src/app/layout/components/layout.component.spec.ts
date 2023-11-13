import { Router } from "@angular/router";
import { LayoutComponent } from "./layout.component";

describe('SUT: LayoutComponent', () => {
  let sut: LayoutComponent;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;

    sut = new LayoutComponent(router);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  })

  it('should be when you click on the tab, the tab becomes active', () => {
   let tabs = [
      { title: 'Flight', active: true ,route:'/'},
      { title: 'Train', active: false ,route:'Train'},
    ];
    
    sut.activateTab(tabs[0])
    expect(tabs[0].active).toBe(true)
    expect(tabs[1].active).toBe(false)
  });
  
});
