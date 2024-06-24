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
import { AboutComponent } from './components/about/about.component';
import { ServDetailComponent } from './components/serv-detail/serv-detail.component';
import { BlogComponent } from './components/blog/blog.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceComponent } from './components/service/service.component';
import { ServPenalComponent } from './components/serv-penal/serv-penal.component';
import { ServCivilComponent } from './components/serv-civil/serv-civil.component';
import { ServInmoComponent } from './components/serv-inmo/serv-inmo.component';
import { ServEmpComponent } from './components/serv-emp/serv-emp.component';
import { ServProIntComponent } from './components/serv-pro-int/serv-pro-int.component';
import { ServAduExtComponent } from './components/serv-adu-ext/serv-adu-ext.component';
import { LoginComponent } from './components/login/login.component';
import { RequestComponent } from './components/request/request.component';
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
    AboutComponent,
    ServDetailComponent,
    BlogComponent,
    FaqComponent,
    ContactComponent,
    ServiceComponent,
    ServPenalComponent,
    ServCivilComponent,
    ServInmoComponent,
    ServEmpComponent,
    ServProIntComponent,
    ServAduExtComponent,
    LoginComponent,
    RequestComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'camiwa';
  constructor(
    public global: GlobalService,
    public script: ScriptService,
    public virtualRouter: virtualRouter ,
 ) {
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
}

