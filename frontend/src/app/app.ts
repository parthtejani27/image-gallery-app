import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Image } from './services/image';
import { CommonModule } from '@angular/common';
import { ImageUpload } from './components/image-upload/image-upload';
import { ImageGallery } from './components/image-gallery/image-gallery';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    ImageUpload,
    ImageGallery,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Image Gallery';
  images: any[] = [];
  loading = false;
  selectedImage: any = null;

  constructor(private imageService: Image) {}

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    this.loading = true;
    this.imageService.getAllImages().subscribe({
      next: (images) => {
        this.images = images;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading images:', error);
        this.loading = false;
      },
    });
  }

  onImageUploaded() {
    this.loadImages();
  }

  openImageModal(image: any) {
    this.selectedImage = image;
  }

  closeModal() {
    this.selectedImage = null;
  }

  getLatestDate(): string {
    if (this.images.length === 0) return '';

    const latest = this.images.reduce((latest, img) => {
      return new Date(img.uploadedAt) > new Date(latest.uploadedAt)
        ? img
        : latest;
    });

    return new Date(latest.uploadedAt).toLocaleDateString();
  }
}
