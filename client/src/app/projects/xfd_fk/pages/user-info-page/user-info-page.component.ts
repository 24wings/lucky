import { Component, OnInit } from '@angular/core';
import { IDataStrategy } from 'app/libs/meta-ui/service/data-strategy/IDataStrategy';
import { XfdFxEntityEnum } from '../../xfd_fk.EntityEnum';
import { EntityEnum } from 'app/entity.enum';
import { StorageService } from 'app/libs/meta-ui/service/storage.service';
import { MyHttpService } from 'app/libs/meta-ui/service/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { QueryParam } from 'app/libs/meta-ui/util/stq/QueryParameter';

@Component({
  selector: 'user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {
  user: any;
  constructor(public dataStrategy: IDataStrategy, public store: StorageService, private myHttp: MyHttpService, public nzMessage: NzMessageService) { }

  async ngOnInit() {
    let param = new QueryParam();
    param.queryConditions = [{ field: "id", compare: "=", andOr: "and", value: this.store.trueUser.id }];
    let data = await this.dataStrategy.entityQuery({ objectCode: EntityEnum.User } as any, param);
    this.user = data.paging.rows[0];

  }

  async  modify() {
    let res = await this.myHttp.Post('/xfd_fk/user/modify', this.user);
    if (res) {
      this.nzMessage.success("修改个人信息成功，记得用新的信息登陆");
    }
  }

}
