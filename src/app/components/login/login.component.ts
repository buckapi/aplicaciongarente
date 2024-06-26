import { Component, Renderer2 } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { PocketAuthService } from '../../services/pocket-auth.service';
import PocketBase from 'pocketbase';
import { virtualRouter } from '@app/services/virtualRouter.service';
import {
  FormBuilder,
  FormGroup, ReactiveFormsModule, AbstractControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  ngFormLogin: FormGroup;
  submitted = false;
  isError=false;
constructor (
  private renderer: Renderer2,
  public global: GlobalService,
  public pocketAuthService:PocketAuthService,
  private formBuilder: FormBuilder,
  public virtualRouter:virtualRouter
){
  this.ngFormLogin = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
}
ngOnInit(): void {
  this.ngFormLogin = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
}

get f(): { [key: string]: AbstractControl } {
  return this.ngFormLogin.controls;
}
onLogin(): void {
  this.submitted = true;
  if (this.ngFormLogin.invalid) {
    return;
  }

  // Iniciar sesión utilizando el servicio PocketAuthService
  this.pocketAuthService
    .loginUser(this.ngFormLogin.value.email, this.ngFormLogin.value.password)
    .subscribe(
      (data) => {
        // Manejar la respuesta del servicio de autenticación
        this.pocketAuthService.setUser(data.record);
        const { username, email, id, type } = data.record;
        this.global.currentUser = { username, email, id, type };

        // Establecer el tipo de usuario en localStorage
        localStorage.setItem('type', type);

        // Redirigir al usuario según el tipo de usuario registrado
        switch (type) {
          case 'admin':
            this.virtualRouter.routerActive = 'request';
            break;
          case 'traveler':
            // Si el tipo de usuario es 'cliente', hacer la solicitud al API
            this.renderer.setAttribute(
              document.body,
              'class',
              'fixed sidebar-mini sidebar-collapse'
            );
             // Pasar el ID del cliente al método
            return; // Salir del switch para evitar redirigir a 'request'
          default:
            this.virtualRouter.routerActive = 'home';
            break;
        }

        // Marcar al usuario como logueado en localStorage
        localStorage.setItem('isLoggedin', 'true');
        // Actualizar los datos del cliente en la aplicación
        this.global.ClientFicha();
      },
      (error) => this.onIsError()
    );
}




onIsError(): void {
  this.isError = true;
  setTimeout(() => {
    this.isError = false;
  }, 4000);
}
}
