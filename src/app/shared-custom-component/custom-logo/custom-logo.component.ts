import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-logo',
  templateUrl: './custom-logo.component.html',
  styleUrls: ['./custom-logo.component.scss'],
  standalone: true,
})
export class CustomLogoComponent {
  logoUrl = 'url(../../../../../assets/images/logo/logo.png)';
}
