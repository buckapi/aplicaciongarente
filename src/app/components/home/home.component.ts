import { Component, OnInit} from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { Yeoman } from '../../services/yeoman.service';
import { DataApiService } from '../../services/data-api-service';
import { FormBuilder, FormControlDirective, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  ngFormRequest: FormGroup;
  submitted = false;
constructor(
  public global:GlobalService,
  public yeoman: Yeoman,
  public dataApiService: DataApiService,
  private formBuilder: FormBuilder,

){
  this.ngFormRequest = this.formBuilder.group({
    email: ['', [Validators.required]],
    name: ['', [Validators.required]],
    di: ['', [Validators.required]],
    numWhat: ['', [Validators.required]],
    placExpd: ['', [Validators.required]],


  });
}
saveRequest() {
  let data: any = {};
  data = this.ngFormRequest.value;
/*   console.log("DATA: "+data.email)
 */  // let request = { "name": data };
  this.dataApiService.saveRequest(data).subscribe(
    response => {
      console.log('Categoría guardada correctamente:', response);
      // Agregar la marca de la respuesta al array de marcas, si es necesario

      // Limpiar los valores para futuros usos
      this.global.request = '';
      this.yeoman.allrequest.push(response);
      this.yeoman.allrequest = [...this.yeoman.allrequest];
      // Cerrar el modal
      /* this.activeModal.close(); */
    },
    error => {
      console.error('Error al guardar :', error);
    }
  );
}

ngOnInit(): void {
  this.ngFormRequest = this.formBuilder.group({
    email: ['', [Validators.required]],
    name: ['', [Validators.required]],
    di: ['', [Validators.required]],
    numWhat: ['', [Validators.required]],
    placExpd: ['', [Validators.required]],
  });
}

}
