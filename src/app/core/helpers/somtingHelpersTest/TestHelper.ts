import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export class TestUtil {
  static directiveElement(fixture: ComponentFixture<any>, directive: any) {
    const dirctive = fixture.debugElement.query(By.directive(directive)).injector.get<any>(directive);
    return dirctive;
  }

  static queryElement(fixture: ComponentFixture<any>, cssSelector, directiveElement) {
    const selector = fixture.debugElement.query(By.css(cssSelector)).injector.get<any>(directiveElement);
    return selector;
  }

  static queryComponent(fixture: ComponentFixture<any>, cssSelector) {
    const debugeElement = fixture.debugElement.query(By.css(cssSelector));
    return debugeElement.componentInstance;
  }

  static nativeElement(fixture: ComponentFixture<any>, element) {
    const query = fixture.debugElement.query(By.css(element)).nativeElement;
    return query;
  }
}
