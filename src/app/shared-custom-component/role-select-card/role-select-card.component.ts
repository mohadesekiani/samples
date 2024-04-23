import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';

@Component({
  selector: 'role-select-card',
  template: ` <div class="card custom-card">
    <div class="card-body pt-0">
      <div class="card-header-wrapp">
        <div class="img-wrapp">
          <img
            [src]="
              isBasicBusinessRole
                ? '../../../../assets/images/avatar.png'
                : item.avatarUrl || '../../../../assets/images/avatar.png'
            "
            alt=""
            class="rounded-2 me-2 business-role-avatar"
          />
        </div>
        <div>
          <h6 class="mb-0">{{ header }}</h6>

          <span class="text-muted">{{ description }}</span>
          <br />
          <span class="text-muted">توضیحات</span>
        </div>
        <div class="border-top actions-wrapp" *ngIf="btnSelectRole">
          <button class="btn btn-outline-success grey p-1 mt-1" (click)="onClick(item)">
            انتخاب نقش
          </button>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./role-select-card.component.scss'],
})
export class RoleSelectCardComponent {
  @Input() item: any = null;
  @Input() header: any = null;
  @Input() description: any = null;
  @Input() btnSelectRole: boolean = false;
  @Input() isBasicBusinessRole: boolean = false;
  @Output() tempMenuChange: EventEmitter<any> = new EventEmitter();

  onClick(item) {
    this.tempMenuChange.emit(item);
  }
}
