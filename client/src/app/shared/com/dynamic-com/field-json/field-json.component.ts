import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
// import { JsonEditorOptions, JsonEditorComponent } from 'ang-jsoneditor';
import { ValidService } from 'app/libs/meta-ui/service/validate.service';
import { StringComSpec } from 'app/libs/meta-ui/util/spec/field/string.comspec';

@Component({
  selector: 'app-field-json',
  templateUrl: './field-json.component.html',
  styles: []
})
export class FieldJsonComponent extends StringComSpec implements OnInit {
  data: any;
  // @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  constructor(public validService: ValidService) {
    super(validService)
    // this.editorOptions = new JsonEditorOptions()
    // this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    this.data = { "products": [{ "name": "car", "product": [{ "name": "honda", "model": [{ "id": "civic", "name": "civic" }, { "id": "accord", "name": "accord" }, { "id": "crv", "name": "crv" }, { "id": "pilot", "name": "pilot" }, { "id": "odyssey", "name": "odyssey" }] }] }] }
  }


  ngOnInit() {
  }

}
