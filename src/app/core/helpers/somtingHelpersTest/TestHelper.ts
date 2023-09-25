import { ComponentFixture } from "@angular/core/testing";
import { FormArrayName, FormControlDirective, FormControlName } from "@angular/forms";
import { By } from "@angular/platform-browser";

export class TestUtil {
  static directiveElement(fixture: ComponentFixture<any>, directive: any) {
    return fixture.debugElement.query(By.directive(directive)).injector.get<any>(directive);
  }

  static formControl(fixture: ComponentFixture<any>, selector: string) {
    return this.debugElement(fixture, selector).injector.get<any>(FormControlName);
  }
  static formArray(fixture: ComponentFixture<any>, selector: string) {
    return this.debugElement(fixture, selector).injector.get<any>(FormArrayName);
  }
  static queryElement(fixture: ComponentFixture<any>, cssSelector: string, directiveElement: any) {
    return fixture.debugElement.query(By.css(cssSelector)).injector.get<any>(directiveElement);
  }

  static queryComponent(fixture: ComponentFixture<any>, cssSelector: string) {
    const debugElement = this.debugElement(fixture, cssSelector);
    return debugElement.componentInstance;
  }

  static nativeElement<T = any>(fixture: ComponentFixture<any>, element: string) {
    const query = this.debugElement(fixture, element).nativeElement as T;
    return query;
  }

  static debugElement(fixture: ComponentFixture<any>, element: string) {
    return fixture.debugElement.query(By.css(element));
  }

  static querySelector(fixture: ComponentFixture<any>, element) {
    const query = fixture.debugElement.nativeElement.querySelector(element)
    return query;
  }
}
