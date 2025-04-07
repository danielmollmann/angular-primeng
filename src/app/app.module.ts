import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar'; // Importando MenubarModule
import { BadgeModule } from 'primeng/badge'; // Importando BadgeModule
import { AppComponent } from './app.component'; // Importando AppComponent

@NgModule({
  imports: [
    BrowserModule,
    MenubarModule,
    BadgeModule
  ],
  providers: [],
})
export class AppModule { }
