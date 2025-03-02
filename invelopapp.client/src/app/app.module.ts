import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { TableComponent } from './components/table/table.component';

import { appConfig } from '../../app.config';
import { PrimeModule } from '../shared/modules/prime/prime.module';
import { contactReducer } from './store/contacts/contact.reducer';
import { ContactEffects } from './store/contacts/contact.effects';
import { AddContactComponent } from './components/table/dialogs/add-contact/add-contact.component';
import { UpdateContactComponent } from './components/table/dialogs/update-contact/update-contact.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddContactComponent,
    UpdateContactComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ contacts: contactReducer }),
    EffectsModule.forRoot([ContactEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    PrimeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', 
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
      newestOnTop: true,
    })
  ],
  providers: [appConfig.providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
