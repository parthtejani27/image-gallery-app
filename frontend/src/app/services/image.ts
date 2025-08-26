import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Image {
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.API_URL}/upload`, formData);
  }

  getAllImages(): Observable<any[]> {
    return this.http
      .get<any>(`${this.API_URL}/images`)
      .pipe(map((response) => response.data || []));
  }
}
