import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './component/bread-crumb/bread-crumb.component';
import { UiSwitchModule } from 'ngx-toggle-switch';


@NgModule({
  declarations: [BreadCrumbComponent],
  imports: [
    CommonModule, MaterialModule, RouterModule, UiSwitchModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    UiSwitchModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BreadCrumbComponent
  ]
})
export class SharedModule { }
