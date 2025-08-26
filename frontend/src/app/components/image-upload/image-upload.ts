import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Image } from '../../services/image';

@Component({
  selector: 'app-image-upload',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.css',
})
export class ImageUpload {
  @Output() imageUploaded = new EventEmitter<void>();

  selectedFile: File | null = null;
  uploading = false;
  message = '';
  messageType = '';

  constructor(private imageService: Image) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.message = '';
  }

  uploadImage() {
    if (!this.selectedFile) {
      this.showMessage('Please select a file', 'danger');
      return;
    }

    this.uploading = true;
    this.imageService.uploadImage(this.selectedFile).subscribe({
      next: (response) => {
        this.showMessage('Image uploaded successfully!', 'success');
        this.resetForm();
        this.imageUploaded.emit();
      },
      error: (error) => {
        this.showMessage('Upload failed: ' + error.message, 'danger');
        this.uploading = false;
      },
    });
  }

  resetForm() {
    this.selectedFile = null;
    this.uploading = false;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  showMessage(text: string, type: string) {
    this.message = text;
    this.messageType = type;
    setTimeout(() => (this.message = ''), 3000);
  }
}
