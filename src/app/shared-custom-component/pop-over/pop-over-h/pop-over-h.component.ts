import { Component, OnInit } from '@angular/core';
import { NgbPopoverConfig, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuApiAndStateManagemnetService } from '@proxy/menu-api-and-state-management/menu-api-and-state-managemnet.service';
import { HelperService } from './../../../proxy/helper/helper.service';

@Component({
  selector: 'app-popover-h',
  standalone: true,
  imports: [NgbPopoverModule],
  templateUrl: './pop-over-h.component.html',
  providers: [NgbPopoverConfig], // add NgbPopoverConfig to the component providers
})
export class PopOverHComponent implements OnInit {
  selectedBusinessRoleInfo;

  constructor(
    config: NgbPopoverConfig,
    private menuApiStateService: MenuApiAndStateManagemnetService,
    private helperService: HelperService
  ) {
    // customize default values of popovers used by this component tree
    config.placement = 'end';
    config.triggers = 'hover';

    // example of usage for popperOptions
    config.popperOptions = options => {
      for (const modifier of options.modifiers || []) {
        if (modifier.name === 'offset' && modifier.options) {
          modifier.options.offset = () => [30, 8];
        }
      }
      return options;
    };
  }
  ngOnInit(): void {
    const  selectedBusinessRoleTitle = this.helperService.getFromLocalStorage('selectedBusinessRole').title;
    this.selectedBusinessRoleInfo = selectedBusinessRoleTitle ? selectedBusinessRoleTitle : this.helperService.getFromLocalStorage('selectedBusinessRole').userBusiness.title;
    this.menuApiStateService.selectedBusinessRoleInfo.subscribe(res => {
      this.selectedBusinessRoleInfo = res;
    });
  }
}
