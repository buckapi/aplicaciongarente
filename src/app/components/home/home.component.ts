import { Component, OnInit} from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { Yeoman } from '../../services/yeoman.service';
import { DataApiService } from '../../services/data-api-service';
import { FormBuilder, AbstractControl, FormControlDirective, ReactiveFormsModule } from '@angular/forms';
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
  public isError = false;
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
    infLabol: ['', [Validators.required]],
    aptoPlace: ['', [Validators.required]],
    numApto: ['', [Validators.required]],
    Asesor: ['', [Validators.required]],
    inmobiliaria: ['', [Validators.required]],
    canon: ['', [Validators.required]],
    terminos: ['', [Validators.required]],

  });
}
saveRequest() {
  let data: any = {};
  data = this.ngFormRequest.value;
/*   console.log("DATA: "+data.email)
 */  // let request = { "name": data };
  this.dataApiService.saveRequest(data).subscribe(
    response => {
      console.log('Solicitud guardada correctamente:', response);
      // Agregar la marca de la respuesta al array de marcas, si es necesario

      // Limpiar los valores para futuros usos
      this.global.request = '';
      this.yeoman.allrequest.push(response);
      this.yeoman.allrequest = [...this.yeoman.allrequest];
      this.isError = false;

    },
    error => this.onIsError()
   /*  error => {
      console.error('Error al guardar :', error);
    } */
  );
}

ngOnInit(): void {
  this.ngFormRequest = this.formBuilder.group({
    email: ['', [Validators.required]],
    name: ['', [Validators.required]],
    di: ['', [Validators.required]],
    numWhat: ['', [Validators.required]],
    placExpd: ['', [Validators.required]],
    infLabol: ['', [Validators.required]],    
    aptoPlace: ['', [Validators.required]],
    numApto: ['', [Validators.required]],
    Asesor: ['', [Validators.required]],
    inmobiliaria: ['', [Validators.required]],
    canon: ['', [Validators.required]],
    terminos: ['', [Validators.required]],

  });
}
get f(): { [key: string]: AbstractControl } {
  return this.ngFormRequest.controls;
}
onIsError(): void {
  // this.ngxService.stop("loader-02");
this.isError = true;
// this.ngxService.stop("loader-02");
setTimeout(() => {
  this.isError = false;
}, 4000);
}
}
