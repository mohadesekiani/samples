import { Injectable } from '@angular/core';
import { AbstractCaptchaService } from './captcha.abstract.service';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService extends AbstractCaptchaService {}
