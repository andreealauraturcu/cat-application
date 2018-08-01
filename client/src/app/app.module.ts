import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CatService } from './shared/cat/cat.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CatListComponent } from './cat-list/cat-list.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GiphyService } from './shared/giphy/giphy.service';
import { CatEditComponent } from './cat-edit/cat-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { AuthInterceptor } from './shared/okta/auth.interceptor';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cat-list',
    component: CatListComponent
  },
  {
    path: 'cat-add',
    component: CatEditComponent
  },
  {
    path: 'cat-edit/:id',
    component: CatEditComponent
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
];

const config = {
  issuer: 'https://dev-455180.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oafuppcnrAzfZhW80h7'
};

@NgModule({
  declarations: [
    AppComponent,
    CatListComponent,
    CatEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule.initAuth(config)
  ],
  providers: [CatService, GiphyService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
