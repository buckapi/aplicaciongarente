import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { Yeoman } from '../../services/yeoman.service';
import { DataApiService } from '../../services/data-api-service';
import {
  FormBuilder,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  ngFormRequest: FormGroup;
  submitted = false;
  public isError = false;
  constructor(
    public global: GlobalService,
    public yeoman: Yeoman,
    public dataApiService: DataApiService,
    private formBuilder: FormBuilder
  ) {
    this.ngFormRequest = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      clienType: ['', [Validators.required]],
      di: ['', [Validators.required]],
      numWhat: ['', [Validators.required]],
      placExpd: ['', [Validators.required]],
      aptoPlace: ['', [Validators.required]],
      numApto: ['', [Validators.required]],
      Asesor: ['', [Validators.required]],
      inmobiliaria: ['', [Validators.required]],
      canon: ['', [Validators.required]],
      terminos: ['', [Validators.required]],
      DeclarationType: ['', [Validators.required]],
      infLabol: ['', [Validators.required]],
      infLabolMount: ['', [Validators.required]],
      infLabolTime: ['', [Validators.required]],
      refNameP1: ['', [Validators.required]],
      refPhoneP1: ['', [Validators.required]],
      refEmailP1: ['', [Validators.required]],
      refCityP1: ['', [Validators.required]],
      refNameP2: ['', [Validators.required]],
      refPhoneP2: ['', [Validators.required]],
      refEmailP2: ['', [Validators.required]],
      refCityP2: ['', [Validators.required]],
      refNameF1: ['', [Validators.required]],
      refEmailF1: ['', [Validators.required]],
      refCityF1: ['', [Validators.required]],
      refPhoneF1: ['', [Validators.required]],
      refNameF2: ['', [Validators.required]],
      refCityF2: ['', [Validators.required]],
      refPhoneF2: ['', [Validators.required]],
      refEmailF2: ['', [Validators.required]]
    });
  }
  saveRequest() {
    let data: any = {};
    data = this.ngFormRequest.value;
    /*   console.log("DATA: "+data.email)
     */ // let request = { "name": data };
    this.dataApiService.saveRequest(data).subscribe(
      (response) => {
        console.log('Solicitud guardada correctamente:', response);
        // Agregar la marca de la respuesta al array de marcas, si es necesario

        // Limpiar los valores para futuros usos
        this.global.request = '';
        this.yeoman.allrequest.push(response);
        this.yeoman.allrequest = [...this.yeoman.allrequest];
        this.isError = false;
      },
      (error) => this.onIsError()
      /*  error => {
      console.error('Error al guardar :', error);
    } */
    );
  }

  ngOnInit(): void {
    this.ngFormRequest = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      clienType: ['', [Validators.required]],
      di: ['', [Validators.required]],
      numWhat: ['', [Validators.required]],
      placExpd: ['', [Validators.required]],
      aptoPlace: ['', [Validators.required]],
      numApto: ['', [Validators.required]],
      Asesor: ['', [Validators.required]],
      inmobiliaria: ['', [Validators.required]],
      canon: ['', [Validators.required]],
      terminos: ['', [Validators.required]],
      DeclarationType: ['', [Validators.required]],
      infLabol: ['', [Validators.required]],
      infLabolMount: ['', [Validators.required]],
      infLabolTime: ['', [Validators.required]],
      refNameP1: ['', [Validators.required]],
      refPhoneP1: ['', [Validators.required]],
      refEmailP1: ['', [Validators.required]],
      refCityP1: ['', [Validators.required]],
      refNameP2: ['', [Validators.required]],
      refPhoneP2: ['', [Validators.required]],
      refEmailP2: ['', [Validators.required]],
      refCityP2: ['', [Validators.required]],
      refNameF1: ['', [Validators.required]],
      refEmailF1: ['', [Validators.required]],
      refCityF1: ['', [Validators.required]],
      refPhoneF1: ['', [Validators.required]],
      refNameF2: ['', [Validators.required]],
      refCityF2: ['', [Validators.required]],
      refPhoneF2: ['', [Validators.required]],
      refEmailF2: ['', [Validators.required]]
      
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
