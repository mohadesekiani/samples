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

  static nativeElement<T = any>(fixture: ComponentFixture<any>, element: string) {
    const query = fixture.debugElement.query(By.css(element)).nativeElement as T;
    return query;
  }

  static querySelector(fixture: ComponentFixture<any>, element) {
    const query = fixture.debugElement.nativeElement.querySelector(element)
    return query;
  }
}
