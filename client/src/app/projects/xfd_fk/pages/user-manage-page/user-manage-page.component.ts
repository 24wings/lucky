import { Component, OnInit, ViewChild } from '@angular/core';
import { D, U, C } from 'app/libs/meta-ui/util/meta/Power';
import { OrgManage } from 'app/blueprint/rbac/meta/OrgManage';
import { MetaCom } from 'app/libs/meta-ui/util/meta/MetaCom';
import { getMetaEntity } from 'app/libs/meta-ui/util/meta/MetaEntity';
import { UserManage } from 'app/blueprint/rbac/meta/UserManage';
import { MetaObjectComponent } from 'app/libs/meta-ui/com/meta-object/meta-object.component';

@Component({
  selector: 'user-manage-page',
  templateUrl: './user-manage-page.component.html',
  styleUrls: ['./user-manage-page.component.css']
})
export class UserManagePageComponent implements OnInit {

  power: number = C | U | D;
  orgMetaCom: MetaCom = Object.create(getMetaEntity(OrgManage));
  userMetaCom = Object.create(getMetaEntity(UserManage));
  @ViewChild('userMetaObjectComponent') userMetaObjectComponent: MetaObjectComponent;
  constructor() { }

  ngOnInit() {
  }
  doAction($event) {
    console.log($event);
    this.userMetaCom.data.presetConditions = [{ field: "orgId", value: $event.data.orgId, andOr: "and", compare: "=" }]
    this.userMetaObjectComponent.query()
  }
}
