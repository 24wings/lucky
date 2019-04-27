import { Component, ChangeDetectorRef, Input } from "@angular/core";
import { ValidService } from "app/libs/meta-ui/service/validate.service";
import { NzMessageService } from "ng-zorro-antd";
import { MyHttpService } from "app/libs/meta-ui/service/http.service";
import { IDataStrategy } from "app/libs/meta-ui/service/data-strategy/IDataStrategy";
import { ModeEnum } from "app/libs/meta-ui/util/meta/Mode.enum";
import { MetaEditorComponent } from "app/libs/meta-ui/com/meta-object/meta-editor/meta-editor.component";

@Component({
    selector: 'demo-editor',
    templateUrl: './demo-editor.component.html',
    styleUrls: [],

})
export class DemoEditorComponent extends MetaEditorComponent {
    ModeEnum = ModeEnum;
    valueObject = {};
    @Input() state = ModeEnum.Create


    constructor(private valid: ValidService,
        public msg: NzMessageService,
        public http: MyHttpService,
        public ref: ChangeDetectorRef,
        public dataStrategy: IDataStrategy,
    ) {
        super(valid, msg, http, ref, dataStrategy)
    }

    getField(fieldName: string) {
        return this.metaCom.metaFields.find(field => field.fieldName == fieldName);
    }

    count() {

    }
}