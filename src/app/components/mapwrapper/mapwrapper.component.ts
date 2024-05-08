import { Component } from '@angular/core';
import { FilterbarComponent } from '../ui/filterbar/filterbar.component';

import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mapwrapper',
  standalone: true,
  imports: [FilterbarComponent,CommonModule],
  templateUrl: './mapwrapper.component.html',
  styleUrl: './mapwrapper.component.css'
})
export class MapwrapperComponent {
constructor(
  public global: GlobalService,
){}
}
