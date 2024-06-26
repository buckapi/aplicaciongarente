import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '@app/services/global.service';
import { virtualRouter } from '@app/services/virtualRouter.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  constructor (
    public global: GlobalService,
    public virtualRoute: virtualRouter
  ){}

}
