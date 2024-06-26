import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRESTService } from '@app/services/auth-rest.service';
import { GlobalService } from '@app/services/global.service';
import { PocketAuthService } from '@app/services/pocket-auth.service';
import { Yeoman } from '@app/services/yeoman.service';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
constructor (
  public global: GlobalService,
  public yeoman: Yeoman,
  public pocketAuth: PocketAuthService,
  public authRest: AuthRESTService

){
  this.authRest.getCurrentUser();

}


view(request:any){
  this.global.previewRequest=request;
  this.global.setRoute('detail');
}
}
