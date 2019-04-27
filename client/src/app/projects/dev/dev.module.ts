import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignPageComponent } from './pages/design-page/design-page.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { MetaUiModule } from 'app/libs/meta-ui/meta-ui.module';

@NgModule({
  imports: [
    MetaUiModule.forRoot(),
    SharedModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: DesignPageComponent }])
  ],
  declarations: [DesignPageComponent]
})
export class DevModule { }
