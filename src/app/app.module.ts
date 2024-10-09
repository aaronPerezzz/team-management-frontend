import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTabsModule } from '@angular/material/tabs';  
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalModule, MsalService, MsalGuard, MsalBroadcastService, MsalInterceptor, MsalInterceptorConfiguration, MsalGuardConfiguration, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType, IPublicClientApplication } from '@azure/msal-browser';




const isIE = window.navigator.userAgent.includes('MSIE') || window.navigator.userAgent.includes('Trident/');

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    
      auth: {
        clientId: 'b9f2a066-b306-417b-b549-4f51ef597177',
        authority: 'https://login.microsoftonline.com/102d3653-c8a4-4711-a5a3-7dc0ab963878',
        redirectUri: 'http://localhost:4200'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE
      }
    
  })}
    

  export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return { interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }}}

      export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
       return{ interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ])}}



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatListModule,
    BrowserModule,
    MatTabsModule,  
    MatCardModule, MatGridListModule, MatMenuModule, MatIconModule, MatButtonModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    AppRoutingModule,
  ],
  providers: [
    provideAnimationsAsync(),
    CookieService,
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



