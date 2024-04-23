import { Injectable, inject } from '@angular/core';
import { CaptchaProxyService } from '@proxy/captcha/captcha-proxy.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractCaptchaService {
  protected readonly proxyService = inject(CaptchaProxyService);
  protected readonly isNotCorrect = new BehaviorSubject<boolean>(false);

  get isNotCorrect$() {
    return this.isNotCorrect.asObservable();
  }

  getCaptcha() {
    return this.proxyService.getCaptcha();
  }
  putCaptcha(id: string, value: string) {
    return this.proxyService.putCaptcha(id, value).pipe(
      tap(isCorrect => {
        isCorrect ? this.setCapatchaIsTrue() : this.setCapatchaIsFalse();
      })
    );
  }

  setCapatchaIsFalse() {
    this.isNotCorrect.next(true);
  }
  setCapatchaIsTrue() {
    this.isNotCorrect.next(false);
  }
}
