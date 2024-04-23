import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { ProductListModule } from './product-lists/product-list/product-list.module';
import { AccessPatternListModule } from './access-pattern-lists/access-pattern-list/access-pattern-list.module';
import { BusinessRoleListsModule } from './business-role-lists/business-role-lists.module';
import { CustomLogoComponent } from './custom-logo/custom-logo.component';
import { CustomTextInputComponent } from './custom-inputs/custom-text-input/custom-text-input.component';
import { CustomNumInputComponent } from './custom-inputs/custom-num-input/custom-num-input.component';
import { CustomBooleanComponent } from './custom-boolean/custom-boolean.component';
import { CaptchaComponent } from './captcha/components/captcha.component';
import { CustomPasswordInputComponent } from './custom-inputs/custom-password-input/custom-password-input.component';
import { CustomLogoutComponent } from './custom-logout/custom-logout.component';
import { CustomPriceInputComponent } from './custom-inputs/custom-price-input/custom-price-input.component';
import { RoleSelectCardComponent } from './role-select-card/role-select-card.component';
import { CustomTextAreaComponent } from './custom-inputs/custom-text-area/custom-text-area.component';
import { CustomEmailInputComponent } from './custom-inputs/custom-email-input/custom-email-input.component';
import { CustomSelectionComponent } from './custom-inputs/custom-selection/custom-selection.component';
import { CustomCheckboxInputComponent } from './custom-inputs/custom-checkbox-input/custom-checkbox-input.component';
import { LoadingButtonComponent } from './custom-buttons/loading-button/loading-button.component';
import { DropDownRolesModule } from './drop-down-roles/drop-down-roles.module';
import { CustomDatePicker2Component } from './custom-inputs/ngb-persian-date-picker/ngb-persian-date-picker.component';

const customInputs = [
  CustomTextInputComponent,
  CustomPriceInputComponent,
  CustomTextAreaComponent,
  CustomEmailInputComponent,
  CustomSelectionComponent,
  CustomNumInputComponent,
  CustomPasswordInputComponent,
  CustomCheckboxInputComponent,
  CustomDatePicker2Component,
];

const modules = [
  CoreModule,
  ThemeSharedModule,
  CommercialUiModule,
  NgbDropdownModule,
  ProductListModule,
  AccessPatternListModule,
  NgxValidateCoreModule,
  BusinessRoleListsModule,

  //standalone
  ...customInputs,
  CustomLogoComponent,
  CustomBooleanComponent,
  CaptchaComponent,
  CustomLogoutComponent,
  DropDownRolesModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules, RoleSelectCardComponent, LoadingButtonComponent],
  declarations: [RoleSelectCardComponent, LoadingButtonComponent],
})
export class SharedModule {}
