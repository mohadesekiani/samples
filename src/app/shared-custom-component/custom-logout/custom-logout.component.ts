import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { HelperService } from '@proxy/helper/helper.service';

@Component({
  selector: 'app-custom-logout',
  templateUrl: './custom-logout.component.html',
  styleUrls: ['./custom-logout.component.scss'],
  standalone: true,
})
export class CustomLogoutComponent {
  constructor(private authService: AuthService, private helperService: HelperService) {}
  onLogOut() {
    this.authService.logout().subscribe(res => {
      console.log(res, 'res logout');

      this.helperService.removeFromLocalStorage('selectedBusinessRole');
      this.helperService.removeFromLocalStorage('isCardSelected');
    });
  }
}
