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
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ngFormRequest: FormGroup;
  submitted = false;
  public isError = false;
  uploadedImage: string | ArrayBuffer | null = null;
  adapter = new CustomFilePickerAdapter(this.http, this._butler, this.global);
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
      terminos: [false, ],
      email: ['', [Validators.required]],
      /* clienType: ['', Validators.required], */
      declarationType: ['', ],
      informationType: ['', ],
      name: ['', ],
      identityType: ['', ],
      di: ['', ],
      rrss: ['', ],
      placExpd: ['', ],
      numWhat: ['', [, ]],
      infLabol: ['', ],
      infLabolMount: ['', ],
      infLabolTime: ['', ],
      aptoPlace: ['', ],
      numApto: ['', ],
      Asesor: ['', ],
      inmobiliaria: ['', ],
      canon: ['', [, ]],
      refNameP1: ['', ],
      refEmailP1: ['', []],
      refPhoneP1: ['', [, ]],
      refCityP1: ['', ],
      refNameP2: ['', ],
      refEmailP2: ['', []],
      refPhoneP2: ['', [, ]],
      refCityP2: ['', ],
      refNameP3: ['', ],
      refEmailP3: ['', []],
      refPhoneP3: ['', [, ]],
      refCityP3: ['', ],
      refNameF1: ['', ],
      refEmailF1: ['', []],
      refPhoneF1: ['', [, ]],
      refCityF1: ['', ],
      refNameF2: ['', ],
      refEmailF2: ['', []],
      refPhoneF2: ['', [, ]],
      refCityF2: ['', ],
      refNameF3: ['', ],
      refEmailF3: ['', []],
      refPhoneF3: ['', [, ]],
      refCityF3: ['', ],
      identityDocument: ['', ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.ngFormRequest.controls;
  }

  getFieldLabel(key: string): string {
    const fieldLabels = {
      email: 'Correo electrónico',
      name: 'Nombre completo',
      identityType: 'Tipo de documento',
      di: 'Número de documento',
      placExpd: 'Lugar de expedición',
      numWhat: 'Número de teléfono',
      infLabol: 'Información laboral',
      refPhoneF1: 'Teléfono de referencia familiar 1',
      refCityF1: 'Ciudad de referencia familiar 1',
      refNameF2: 'Nombre de referencia familiar 2',
      refEmailF2: 'Correo de referencia familiar 2',
      refPhoneF2: 'Teléfono de referencia familiar 2',
      refCityF2: 'Ciudad de referencia familiar 2',
      refNameF3: 'Nombre de referencia familiar 3',
      refEmailF3: 'Correo de referencia familiar 3',
      refPhoneF3: 'Teléfono de referencia familiar 3',
      refCityF3: 'Ciudad de referencia familiar 3',
      identityDocument: 'Documento de identidad'
    };
    return fieldLabels[key as keyof typeof fieldLabels] || key;
  }
  
  /* saveRequest() {
    this.submitted = true; 
  
    // Verifica si el formulario es válido antes de enviarlo
    if (this.ngFormRequest.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos antes de enviar la solicitud.'
      });
      return;
    }
  
    let data: any = this.ngFormRequest.value;
    data.images = this._butler.uploaderImages;
    this._butler.uploaderImages = [];
    
    this.dataApiService.saveRequest(data).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Solicitud guardada correctamente.'
        }).then(() => {
          // Limpiar los valores para futuros usos
          this.global.request = '';
          this.yeoman.allrequest.push(response);
          this.yeoman.allrequest = [...this.yeoman.allrequest];
          this.isError = false;
          
          // Reiniciar el formulario
          this.ngFormRequest.reset();
          this.submitted = false;  // Resetear el estado de envío
  
          // Recargar la página
          window.location.reload();
        });
  
        console.log('Solicitud guardada correctamente:', response);
      },
      (error) => {
        this.onIsError();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar la solicitud. Por favor, inténtelo de nuevo más tarde.'
        });
        console.log('Error al guardar la solicitud:', error);
      }
    );
  } */
  
    saveRequest() {
      this.submitted = true; 
      
      // Eliminamos la verificación de validez del formulario
      let data: any = this.ngFormRequest.value;
      data.images = this._butler.uploaderImages;
      this._butler.uploaderImages = [];
      
      this.dataApiService.saveRequest(data).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Solicitud enviada correctamente.'
          }).then(() => {
            this.global.request = '';
            this.yeoman.allrequest.push(response);
            this.yeoman.allrequest = [...this.yeoman.allrequest];
            this.isError = false;
            this.ngFormRequest.reset();
            this.submitted = false;
            window.location.reload();
          });
        },
        (error) => {
          this.onIsError();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al enviar la solicitud.'
          });
        }
      );
    }
  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file) {
      reader.onload = () => {
        this.uploadedImage = reader.result;
      };
      reader.readAsDataURL(file);
      this.ngFormRequest.patchValue({
        identityDocument: file
      });
    }
  }
  onNext() {
    this.submitted = true;

    if (this.ngFormRequest.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos antes de continuar.',
      });
      return; // Detener la ejecución si el formulario es inválido
    }

    console.log('Formulario válido, continuar a la siguiente sección');
  }
 
  ngOnInit(): void {
   
  }

  onIsError(): void {
    this.isError = true;
    /* setTimeout(() => {
      this.isError = false;
    }, 4000); */
  }
}
