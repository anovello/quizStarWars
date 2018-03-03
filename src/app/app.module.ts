import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { BoxComponent } from './box/box.component';

import { QuizService } from './quiz/quiz.service';
import { Img } from './box/img'

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    BoxComponent,
    RankingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
    SweetAlert2Module.forRoot(),
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}, 
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    QuizService,
    Img,
    NgxSmartModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
