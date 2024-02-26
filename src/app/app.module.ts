import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyTableComponent } from './property-table/property-table.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table'
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PropertyTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    DatePipe
  ],
  providers: [
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
