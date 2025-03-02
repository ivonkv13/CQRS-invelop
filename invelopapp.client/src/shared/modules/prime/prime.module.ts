import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonModule, TableModule, DialogModule, InputTextModule, CardModule, ConfirmDialogModule],
  exports: [ButtonModule, TableModule, DialogModule, InputTextModule, CardModule, ConfirmDialogModule],
  providers: [ConfirmationService]
})
export class PrimeModule {}
