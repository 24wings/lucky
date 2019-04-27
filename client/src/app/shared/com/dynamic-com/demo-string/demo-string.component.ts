import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { ValidService } from 'app/libs/meta-ui/service/validate.service';
// import { Flight } from 'app/projects/hk/entity/Flight';
import { NzMessageService } from 'ng-zorro-antd';
import { MyHttpService } from 'app/libs/meta-ui/service/http.service';
import { IDataStrategy } from 'app/libs/meta-ui/service/data-strategy/IDataStrategy';
import { Member } from 'app/projects/xfd_fk/entity/Member';
import { MetaEditorComponent } from 'app/libs/meta-ui/com/meta-object/meta-editor/meta-editor.component';

@Component({
  selector: 'app-demo-string',
  templateUrl: './demo-string.component.html',
  styles: []
})
export class DemoStringComponent extends MetaEditorComponent implements OnInit {
  newDataItem: Member = {} as any;
  // flightInfo: Flight;
  flghtInfoVisible: boolean = false;
  constructor(public validService: ValidService,
    public msg: NzMessageService,
    public http: MyHttpService,
    public ref: ChangeDetectorRef,
    public dataStrategy: IDataStrategy,
  ) { super(validService, msg, http, ref, dataStrategy) };

  ngOnInit() {
    //   this.queryFlightInfo()
  }

  // async  queryFlightInfo() {
  //   let data = await this.commonService.singleTableQuery(EntityEnum.Flight, { code: this.value });
  //   if (data.paging.rows.length > 0) this.flightInfo = data.paging.rows[0];
  // }


}