import { ImageData } from './image-data';

export interface ImageResponse {
  message?: string;
  data?: ImageData | ImageData[];
  total?: number;
}

export interface UploadResponse {
  message: string;
  data: ImageData;
}

export interface ApiError {
  message: string;
}
