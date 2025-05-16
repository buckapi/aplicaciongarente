import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRESTService } from '@app/services/auth-rest.service';
import { GlobalService } from '@app/services/global.service';
import { PocketAuthService } from '@app/services/pocket-auth.service';
import { Yeoman } from '@app/services/yeoman.service';
import { jsPDF } from 'jspdf';

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
  public yeoman: Yeoman,
  public pocketAuth: PocketAuthService,
  public authRest: AuthRESTService

){
  this.authRest.getCurrentUser();

}


view(request:any){
  this.global.previewRequest=request;
  this.global.setRoute('detail');
}
downloadPDF(request: any) {
  const doc = new jsPDF();
  const margin = 10; // Set margin value
  let currentY = margin; // Start Y position

  // Add content to the PDF
  doc.text(`Correo electrónico: ${request.email}`, margin, currentY);
  currentY += 10; // Move down for the next line

  doc.text(`Nombre completo: ${request.name}`, margin, currentY);
  currentY += 10;

  doc.text(`Número de documento: ${request.di}`, margin, currentY);
  currentY += 10;

  doc.text(`Número de teléfono: ${request.numWhat}`, margin, currentY);
  currentY += 10;

  doc.text(`Dirección de expedición: ${request.placExpd}`, margin, currentY);
  currentY += 10;

  doc.text(`Tipo de declaración: ${request.declarationType}`, margin, currentY);
  currentY += 10;

  doc.text(`Tipo de información: ${request.informationType}`, margin, currentY);
  currentY += 10;

  doc.text(`Tipo de identidad: ${request.identityType}`, margin, currentY);
  currentY += 10;

  doc.text(`Lugar de apto: ${request.aptoPlace}`, margin, currentY);
  currentY += 10;

  doc.text(`Número de apto: ${request.numApto}`, margin, currentY);
  currentY += 10;

  doc.text(`Asesor: ${request.Asesor}`, margin, currentY);
  currentY += 10;

  doc.text(`Inmobiliaria: ${request.inmobiliaria}`, margin, currentY);
  currentY += 10;

  doc.text(`Canon: ${request.canon}`, margin, currentY);
  currentY += 10;

  // References
  const references = [
    { name: request.refNameP1, email: request.refEmailP1, phone: request.refPhoneP1, city: request.refCityP1 },
    { name: request.refNameP2, email: request.refEmailP2, phone: request.refPhoneP2, city: request.refCityP2 },
    { name: request.refNameP3, email: request.refEmailP3, phone: request.refPhoneP3, city: request.refCityP3 },
    { name: request.refNameF1, email: request.refEmailF1, phone: request.refPhoneF1, city: request.refCityF1 },
    { name: request.refNameF2, email: request.refEmailF2, phone: request.refPhoneF2, city: request.refCityF2 },
    { name: request.refNameF3, email: request.refEmailF3, phone: request.refPhoneF3, city: request.refCityF3 }
  ];

  references.forEach((ref, index) => {
    if (currentY >= 280) { // Check if we need to add a new page
      doc.addPage();
      currentY = margin; // Reset Y position for new page
    }
    doc.text(`Referencia ${index + 1} - Nombre: ${ref.name}`, margin, currentY);
    currentY += 10;
    doc.text(`Referencia ${index + 1} - Email: ${ref.email}`, margin, currentY);
    currentY += 10;
    doc.text(`Referencia ${index + 1} - Teléfono: ${ref.phone}`, margin, currentY);
    currentY += 10;
    doc.text(`Referencia ${index + 1} - Ciudad: ${ref.city}`, margin, currentY);
    currentY += 10;
  });

  doc.text(`Documento de identidad: ${request.identityDocument}`, margin, currentY);
  currentY += 10;

  // Add images
  const images = request.images || []; // Ensure images is an array
  images.forEach((imageUrl: string) => {
    if (currentY >= 280) { // Check if we need to add a new page
      doc.addPage();
      currentY = margin; // Reset Y position for new page
    }

    // Add image to PDF
    doc.addImage(imageUrl, 'PNG', margin, currentY, 180, 180); // Adjust width and height as needed
    currentY += 190; // Move down for the next image (adjust based on image size)
  });

  // Save the PDF
  doc.save('request-details.pdf');

}

}
