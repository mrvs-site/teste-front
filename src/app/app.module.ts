import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';

import { ProcessoListaComponent } from './processo-lista/processo-lista.component';
import { ProcessoService } from './service/processo.service';

@NgModule({
  declarations: [
    AppComponent,
    ProcessoListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,   
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ProcessoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
