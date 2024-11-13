import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinceRoutingModule } from './province-routing.module';
// import { ProvinceListComponent } from './components/province-list/province-list.component';
// import { ProvinceAddComponent } from './components/province-add/province-add.component';
// import { ProvinceEditComponent } from './components/province-edit/province-edit.component';
// import { ProvinceViewComponent } from './components/province-view/province-view.component';
import { ProvinceService } from './services/province.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    //ProvinceListComponent,
    // ProvinceAddComponent,
    // ProvinceEditComponent,
    // ProvinceViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProvinceRoutingModule
  ],
  providers: [ProvinceService]
})
export class ProvinceModule { }
