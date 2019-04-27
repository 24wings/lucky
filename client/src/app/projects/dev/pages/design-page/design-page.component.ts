import { Component, OnInit } from '@angular/core';
import { MyHttpService } from 'app/libs/meta-ui/service/http.service';
import { Field } from 'app/libs/meta-ui/util/meta/Field';
import { MetaCom } from 'app/libs/meta-ui/util/meta/MetaCom';
import { C, U, D, Q, S, checkPower } from 'app/libs/meta-ui/util/meta/Power';
import { EntityEnum } from 'app/entity.enum';
type SQLFieldType = "VARCHAR" | "DATETIME" | "INT";
@Component({
  selector: 'design-page',
  templateUrl: './design-page.component.html',
  styleUrls: ['./design-page.component.css']
})
export class DesignPageComponent implements OnInit {
  editFieldVisible: boolean = false;
  sourcePanelActive: boolean = false;
  sql: string = `select * from user;`;
  metaCom: MetaCom;
  fields: Field[] = [];
  power: number = C | U | D | Q | S;
  selectedField: Field;
  listOfOption: { label: string, value: any }[] = [
    { label: "创建", value: C },
    { label: "更新", value: U },
    { label: "删除", value: D },
    { label: "查询", value: Q },
    { label: "显示", value: S }];
  selectedPowers: number[] = [];
  async onClose($event, i) {
    this.metaCom.metaFields.splice(i, 1);
    await this.refershMetaObject()
  }
  constructor(private myHttp: MyHttpService) { }

  ngOnInit() {
  }
  editField(field: Field) {
    this.selectedField = field;
    this.editFieldVisible = true;
    this.selectedPowers = [];
    if (checkPower(this.selectedField.power as any, C)) {
      this.selectedPowers.push(C);
    }
    if (checkPower(this.selectedField.power as any, S)) {
      this.selectedPowers.push(S);
    }
    if (checkPower(this.selectedField.power as any, U)) {
      this.selectedPowers.push(U);
    }

  }
  selectField() {

  }

  getRandomColor(field: Field) {
    switch (field.type) {
      case String:
        return "#2db7f5";
      case Number:
        return '#87d068';
      case Date:
        return '#f50';
    }
  }
  async queryMeta() {
    let result = await this.myHttp.Post('/field', { sql: this.sql });
    await this.sleep(200);
    this.fields = result.fields.map(field => this.sqlFieldToField(field))
    this.metaCom = {
      objectCode: EntityEnum.User,
      data: {},
      metaFields: this.fields, view: { pageSize: 10 }, originClass: Object
    };
  }

  sqlFieldToField(field: { field: string, type: SQLFieldType }): Field {
    switch (field.type) {
      case "VARCHAR":
        return { alias: field.field, fieldName: field.field, type: String, power: this.power, valid: { required: true } };
      case "INT":
        return { alias: field.field, fieldName: field.field, type: Number, power: this.power, valid: { required: true } };
      case "DATETIME":
        return { config: {}, alias: field.field, fieldName: field.field, type: Date, power: this.power, valid: { required: true } }
      default:
        alert(field.type)
    }
  }

  async  confirmEditField() {
    this.selectedField.power = this.selectedPowers.concat([0, 0]).reduce((val1, val2) => val1 | val2);

    await this.refershMetaObject();
  }

  sleep(time: number) {
    return new Promise(resolve => setTimeout(() => {
      resolve(true)
    }, time));

  }
  async refershMetaObject() {
    let obj = this.metaCom;
    this.metaCom = null;
    await this.sleep(200);
    this.metaCom = obj;
  }

  getIndex() {
    return this.metaCom.metaFields.indexOf(this.selectedField);
  }

  minIndex() {
    if (this.getIndex() - 1 >= 0) {
      let preField = this.metaCom.metaFields[this.getIndex() - 1];
      this.metaCom.metaFields.splice(this.getIndex() - 1, 2, this.selectedField, preField);
      this.refershMetaObject()

    }

  }

  addIndex() {
    if (this.getIndex() + 1 <= this.metaCom.metaFields.length) {
      let afterField = this.metaCom.metaFields[this.getIndex() + 1];
      this.metaCom.metaFields.splice(this.getIndex(), 2, afterField, this.selectedField);
      this.refershMetaObject()
    }

  }

  getSource() {
    return this.getClazz();

  }

  private getClazz() {
    return `@MetaEntity()
    export class Entity{
      ${this.getBody()}

    }
  `

  }
  private getBody(): string {
    let fieldsStr = '';
    this.metaCom.metaFields.forEach(field => fieldsStr += this.getField(field))
    return fieldsStr;
  }
  private getField(field: Field) {
    let type = '';
    switch (field.type) {
      case Number:
        type = 'number';
        break;
      case String:
        type = 'string';
        break;
      case Date:
        type = 'Date';
        break;
    };
    let powers: string[] = [];
    let c = checkPower(field.power as any, C);
    if (c) powers.push("C");
    let u = checkPower(field.power as any, U);
    if (u) powers.push("U");
    let s = checkPower(field.power as any, S);
    if (s) powers.push("S");


    return `
    @Prop("${field.alias || field.fieldName}",{power:${powers.length > 0 ? powers.join('|') : 0}})
    ${field.fieldName}:${type};`
  }

  viewSource() {
    let code = this.getSource();
    console.log(code);
  }
}
