import { NgModule } from '@angular/core';
import { AddContactComponent } from './dialogs/add-contact/add-contact.component';
import { UpdateContactComponent } from './dialogs/update-contact/update-contact.component';
import { PrimeModule } from '../../../shared/modules/prime/prime.module';
import { TableComponent } from './table.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: TableComponent }];

@NgModule({
  declarations: [TableComponent, AddContactComponent, UpdateContactComponent],
  imports: [
    PrimeModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class TableModule {}
