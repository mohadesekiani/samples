import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CaptchaService } from '../services/captcha.service';
import { CaptchaResponse } from '@proxy/captcha/captcha-proxy.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomTextInputComponent } from '../../custom-inputs/custom-text-input/custom-text-input.component';
import { Subject, catchError, takeUntil } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LocalizationModule } from '@abp/ng.core';

@Component({
  selector: 'captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomTextInputComponent,
    ProgressSpinnerModule,
    LocalizationModule,
  ],
})
export class CaptchaComponent implements OnInit, OnDestroy {
  @Input({ required: true }) valueControl: FormControl<string | null>;
  @Input({ required: true }) idControl: FormControl<string | null>;
  isNotCorrect: boolean;

  @Input() label: string = 'مقدار داخل تصویر';
  @Input() isNotCorrectError = 'کد داخل تصویر صحیح نمی باشد.';
  @Input() refreshButton: boolean = true;

  myForm: FormGroup;

  captchaResponse?: CaptchaResponse;
  loading = false;

  private unSubAll = new Subject<void>();

  constructor(private captchaService: CaptchaService, private _cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getCaptcha();
    this.subToValueChange();
    this.subToCaptchaErrorHandling();
  }
  ngOnDestroy(): void {
    this.unSubAll.next();
    this.unSubAll.complete();
  }

  refresh(e: MouseEvent) {
    this.getCaptcha();
    e.preventDefault();
  }

  protected subToCaptchaErrorHandling() {
    this.captchaService.isNotCorrect$.pipe(takeUntil(this.unSubAll)).subscribe(bool => {
      this.isNotCorrect = bool;
      if (bool) {
        this.getCaptcha();
        this.valueControl.setValue('');
      }
    });
  }

  protected subToValueChange() {
    this.valueControl.valueChanges.pipe(takeUntil(this.unSubAll)).subscribe(res => {
      res !== '' && this.captchaService.setCapatchaIsTrue();
    });
  }

  protected getCaptcha() {
    this.loading = true;
    this.captchaService
      .getCaptcha()
      .pipe(
        takeUntil(this.unSubAll),
        catchError(err => {
          this.loading = false;
          throw err;
        })
      )
      .subscribe(res => {
        this.loading = false;
        this.captchaResponse = res;
        this.idControl.setValue(res.id);
        this._cdr.detectChanges();
      });
  }
}
