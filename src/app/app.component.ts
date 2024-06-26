import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalService } from './services/global.service';
import { CommonModule } from '@angular/common';
import { ScriptService } from './services/script.service';
import { MapwrapperComponent } from './components/mapwrapper/mapwrapper.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { HeaderHomeComponent } from './components/ui/header-home/header-home.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { virtualRouter } from './services/virtualRouter.service';
import { TestComponent } from './components/test/test.component';
import { HeaderDashboardComponent } from './components/ui/header-dashboard/header-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RequestComponent } from './components/request/request.component';
import { PocketAuthService } from './services/pocket-auth.service';
import { DetailComponent } from './components/detail/detail.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MapwrapperComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeaderHomeComponent,
    TestComponent,
    HeaderDashboardComponent,
    
    LoginComponent,
    RequestComponent,
    DetailComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'camiwa';
  constructor(
    public global: GlobalService,
    public script: ScriptService,
    public pocketAuthService: PocketAuthService,
    public virtualRouter: virtualRouter ,
 ) {
  this.loginCheck();
  this.script.load(
    'gmaps',
    'map-helper',
    'creote-extension',
    'jquery-3.6.0',
    'bootstrap',
    'jquery-fancybox',
    'jQuery-style-switcher',
    'jquery-flexslider',
    'color-scheme',
    'owl',
    'swiper',
    'isotope',
    'countdown',
    'simpleParallax',
    'appear',
    'jquery-countTo',
    'sharer',
    'validation'
  )
    .then(() => {
      console.log('Todos los scripts se cargaron correctamente');
    })
    .catch(error => console.log(error));
    // this.epicFunction();
  }
  loginCheck(){
    this.pocketAuthService.checkLoginStatus();
  }
}

