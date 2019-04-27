import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

// ng -json 
// import { NgJsonEditorModule } from 'ang-jsoneditor'
// region: third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';

import { EnumPipe } from './pipe/enum.pipe';
import { DemoStringComponent } from '@shared/com/dynamic-com/demo-string/demo-string.component';
import { FieldJsonComponent } from '@shared/com/dynamic-com/field-json/field-json.component';
import { ProdQueryComponent } from './com/dynamic-com/prod-query/prod-query.component';
import { OrderQueryComponent } from './com/dynamic-com/order-query/order-query.component';
import { MemberQueryComponent } from './com/dynamic-com/member-query/member-query.component';
import { AnalyzeQueryToolbarComponent } from './com/dynamic-com/analyze-query-toolbar/analyze-query-toolbar.component';
import { DemoEditorComponent } from './com/dynamic-com/demo-editor/demo-editor.component';
import { MetaUiModule } from 'app/libs/meta-ui/meta-ui.module';
const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule
];
// endregion

// region: your componets & directives
const COMPONENTS = [

  FieldJsonComponent,


  DemoStringComponent,

  ProdQueryComponent,

  OrderQueryComponent,
  MemberQueryComponent,
  AnalyzeQueryToolbarComponent,
  DemoEditorComponent,

];
const DIRECTIVES = [EnumPipe];
// endregion

@NgModule({
  imports: [
    // NgJsonEditorModule,
    MetaUiModule.forRoot(),
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,

    // third libs 
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    EnumPipe,
    OrderQueryComponent,
    AnalyzeQueryToolbarComponent,

  ],
  exports: [
    // NgJsonEditorModule,
    ...COMPONENTS,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...DIRECTIVES,
  ],
  entryComponents: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
