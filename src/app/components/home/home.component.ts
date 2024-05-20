import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
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
import Swal from 'sweetalert2';
import { virtualRouter } from '../../services/virtualRouter.service';
import { Butler } from '../../services/butler.service';
import { FilePickerModule, UploaderCaptions } from 'ngx-awesome-uploader';
import { CustomFilePickerAdapter } from '../file-piker.adapter';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FilePickerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Agregar CUSTOM_ELEMENTS_SCHEMA aquí
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  ngFormRequest: FormGroup;
  submitted = false;
  public isError = false;
  adapter = new CustomFilePickerAdapter(this.http,this._butler,this.global);
  imgResult: string = '';
  imgResultAfterCompression: string = '';
  imgResultBeforeCompression: string = '';
  public captions: UploaderCaptions = {
    dropzone: {
      title: '10 MB máx.',
      or: '.',
      browse: 'Subir documento',
    },
    cropper: {
      crop: 'Cortar',
      cancel: 'Cancelar',
    },
    previewCard: {
      remove: 'Borrar',
      uploadError: 'error',
    },
  };
  constructor(
    public global: GlobalService,
    public yeoman: Yeoman,
    public dataApiService: DataApiService,
    private formBuilder: FormBuilder,
    public virtualRouter: virtualRouter,
    public _butler: Butler,
    public http: HttpClient
  ) {
    this.ngFormRequest = this.formBuilder.group({
      terminos: [false, Validators.requiredTrue],
      email: ['', [Validators.required, Validators.email]],
      clientType: ['', Validators.required],  // Agregar el validador requerido
      declarationType: ['', Validators.required],  // Agregar el validador requerido
      informationType: ['', Validators.required],  // Agregar el validador requerido
      name: ['', Validators.required],
      identityType: ['', Validators.required],
      di: ['', Validators.required],
      placExpd: ['', Validators.required],
      numWhat: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      infLabol: ['', Validators.required],
      infLabolMount: ['', Validators.required],
      infLabolTime: ['', Validators.required],
      aptoPlace: ['', Validators.required],
      numApto: ['', Validators.required],
      Asesor: ['', Validators.required],
      inmobiliaria: ['', Validators.required],
      canon: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      refNameP1: ['', Validators.required],
      refEmailP1: ['', [Validators.required, Validators.email]],
      refPhoneP1: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      refCityP1: ['', Validators.required],
      refNameP2: ['', Validators.required],
      refEmailP2: ['', [Validators.required, Validators.email]],
      refPhoneP2: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      refCityP2: ['', Validators.required],
      refNameF1: ['', Validators.required],
      refEmailF1: ['', [Validators.required, Validators.email]],
      refPhoneF1: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      refCityF1: ['', Validators.required],
      refNameF2: ['', Validators.required],
      refEmailF2: ['', [Validators.required, Validators.email]],
      refPhoneF2: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      refCityF2: ['', Validators.required],
      images: ['', Validators.required] as string[],
    });
  }
  saveRequest() {
    this.submitted = true;  // Indicamos que el formulario ha sido enviado

    // Verificar si el formulario es válido
   /*  if (this.ngFormRequest.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos.'
      });
      return;  // Detener la ejecución si el formulario es inválido
    } */

    // Si el formulario es válido, continuar con la lógica de guardado
    let data: any = this.ngFormRequest.value;
    data.images=this._butler.uploaderImages;
    this._butler.uploaderImages=[];
    this.dataApiService.saveRequest(data).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Solicitud guardada correctamente.'
        });
        console.log('Solicitud guardada correctamente:', response);
        
        // Limpiar los valores para futuros usos
        this.global.request = '';
        this.yeoman.allrequest.push(response);
        this.yeoman.allrequest = [...this.yeoman.allrequest];
        this.isError = false;
      },
      (error) => {
        this.onIsError();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Solicitud guardada correctamente.'
        }).then(() => {
          window.location.reload();
        });
        console.log('Solicitud guardada correctamente:', Response);
      }
    );
  }


  ngOnInit(): void {
    this.ngFormRequest = this.formBuilder.group({
      terminos: [false, Validators.requiredTrue],
      email: ['', [Validators.required, Validators.email]],
      clientType: ['', Validators.required],
      declarationType: ['', Validators.required],  // Agregar el validador requerido
      informationType: ['', Validators.required],  // Agregar el validador requerido
      name: ['', Validators.required],
      identityType: ['', Validators.required],
      di: ['', Validators.required],
      placExpd: ['', Validators.required],
      numWhat: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      infLabol: ['', Validators.required],
      infLabolMount: ['', Validators.required],
      infLabolTime: ['', Validators.required],
      aptoPlace: ['', Validators.required],
      numApto: ['', Validators.required],
      Asesor: ['', Validators.required],
      inmobiliaria: ['', Validators.required],
      canon: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      refNameP1: ['', Validators.required],
      refEmailP1: ['', [Validators.required, Validators.email]],
      refPhoneP1: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      refCityP1: ['', Validators.required],
      refNameP2: ['', Validators.required],
      refEmailP2: ['', [Validators.required, Validators.email]],
      refPhoneP2: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      refCityP2: ['', Validators.required],
      refNameF1: ['', Validators.required],
      refEmailF1: ['', [Validators.required, Validators.email]],
      refPhoneF1: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      refCityF1: ['', Validators.required],
      refNameF2: ['', Validators.required],
      refEmailF2: ['', [Validators.required, Validators.email]],
      refPhoneF2: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      refCityF2: ['', Validators.required],
      images: ['', Validators.required] as string[],

    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.ngFormRequest.controls;
  }
  onNext() {
    this.submitted = true;  // Indicamos que el formulario ha sido enviado

    // Verificar si el formulario es válido
    if (this.ngFormRequest.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos antes de continuar.'
      });
      return;  // Detener la ejecución si el formulario es inválido
    }

    // Aquí puedes poner la lógica para ir a la siguiente sección del formulario
    // Por ejemplo, cambiar el panel del formulario
    console.log('Formulario válido, continuar a la siguiente sección');
  }
  onIsError(): void {
        this.isError = true;
       /*  setTimeout(() => {
      this.isError = false;
    }, 4000); */
  }
}
