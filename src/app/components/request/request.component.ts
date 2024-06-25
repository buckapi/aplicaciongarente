import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '@app/services/global.service';
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
  public yeoman: Yeoman
){}


view(request:any){
  this.global.previewRequest=request;
  this.global.setRoute('detail');
}
}
