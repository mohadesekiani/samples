import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export class TestUtil {
  static directiveElement(fixture: ComponentFixture<any>, directive: any) {
    return fixture.debugElement.query(By.directive(directive)).injector.get<any>(directive);
  }

  static queryElement(fixture: ComponentFixture<any>, cssSelector, directiveElement) {
    return fixture.debugElement.query(By.css(cssSelector)).injector.get<any>(directiveElement);
  }

  static queryComponent(fixture: ComponentFixture<any>, cssSelector) {
    const debugElement = fixture.debugElement.query(By.css(cssSelector));
    return debugElement.componentInstance;
  }

  static nativeElement(fixture: ComponentFixture<any>, element) {
    const query = fixture.debugElement.query(By.css(element)).nativeElement;
    return query;
  }
}
