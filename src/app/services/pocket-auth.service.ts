import PocketBase from 'pocketbase';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { UserInterface } from '../interface/user-interface';
import { virtualRouter } from './virtualRouter.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PocketAuthService {
  private pb: PocketBase;
  isLoggedIn=false;
  constructor(
    public virtualRouter: virtualRouter,
    public global:GlobalService) {
    this.pb = new PocketBase('https://db.buckapi.lat:8090');
  }

  async saveCategor(categoryData:any): Promise<any> {
    try {
      const record = await this.pb.collection('camiwaCategories').create(categoryData);
      console.log('Categoría guardada exitosamente:', record);

      return record; // Si necesitas devolver el registro creado
    } catch (error) {
      console.error('Error al guardar la categoría:', error);
      throw error; // Puedes lanzar el error para manejarlo en otro lugar
    }
  }
  async saveSpecialty(specialtyData:any): Promise<any> {
    try {
      const record = await this.pb.collection('camiwaSpecialties').create(specialtyData);
      console.log('Especialidad guardada exitosamente:', record);
// this.global.getSpecialties();
      return record; // Si necesitas devolver el registro creado
    } catch (error) {
      console.error('Error al guardar la especialidad:', error);
      throw error; // Puedes lanzar el error para manejarlo en otro lugar
    }
  }

  registerUser(email: string, password: string, type: string, name: string): Observable<any> {
    const userData = {
      "email": email,
      "password": password,
      "passwordConfirm": password,
      "type": type,
      "username": name,
      "name": name
    };

    // Crear usuario y luego crear el registro en camiwaTravelers
    return from(this.pb.collection('users').create(userData).then((user) => {
      const data = {
        "name": name,
        "address": "", // Agrega los campos correspondientes aquí
        "phone": "", // Agrega los campos correspondientes aquí
        "userId": user.id, // Utiliza el ID del usuario recién creado
        "status": "pending", // Opcional, establece el estado del cliente
        "images": {} // Agrega los campos correspondientes aquí
      };
      return this.pb.collection('camiwaTravelers').create(data);
    }));
  }

  loginUser(email: string, password: string): Observable<any> {
    return from(this.pb.collection('users').authWithPassword(email, password));
  }
  checkLoginStatus(): boolean {
    const token = localStorage.getItem('pocketbase_auth');
    this.isLoggedIn = !!token;
  
    if (this.isLoggedIn) {
      // Opción a: Si está logueado
      this.global.setRoute('request');
      console.log("El usuario está logueado.");
      // Aquí puedes añadir más lógica específica para cuando el usuario esté logueado
    } else {
      this.global.setRoute('home');

      // Opción b: Si no está logueado
      console.log("El usuario no está logueado.");
      // Aquí puedes añadir más lógica específica para cuando el usuario no esté logueado
    }
  
    return this.isLoggedIn;
  }
  
  logoutUser(): Observable<any> {
    // Limpiar la autenticación almacenada
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('dist');
    localStorage.removeItem('userId');
    localStorage.removeItem('type');
    localStorage.removeItem('clientCard');
    localStorage.removeItem('clientFicha');
    this.pb.authStore.clear();
    this.virtualRouter.routerActive = "home";
    return new Observable<any>(observer => {
      observer.next( true); // Indicar que la operación de cierre de sesión ha completado
      observer.complete();
    });
  }

  setToken(token: any): void {
    localStorage.setItem("accessToken", token);
  }

  setUser(user: UserInterface): void {
    let user_string = JSON.stringify(user);
    let type = JSON.stringify(user.type);
    localStorage.setItem("currentUser", user_string);
    localStorage.setItem("type", type);
  }
}
