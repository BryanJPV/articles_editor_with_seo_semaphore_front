export interface NewsAPI {
  id: number;
  titulo: string;
  subtitulo: string;
  seo_url: string;
  img_url: string;
  img_description: string;
  img_url_blob: File | null;
  keywords: string;
  status: boolean;
  publish_date: string;
  news_content:  NewsContentAPI[];
}

export interface NewsContentAPI {
  id: number;
  position: number;
  tipo: number;
  contenido: string;
  descripcion: string;
  file: any;
}

export interface News {
  id: number;
  titulo: string;
  subtitulo: string;
  seo_url: string;
  img_url: string;
  img_description: string;
  img_url_blob: File | null;
  keywords: string;
  status: boolean;
  publish_date: string;
  news_content:  NewsContent[];
}

export interface NewsContent {
  id: number;
  position: number;
  position_anterior: number;
  tipo: number;
  tipo_anterior: number;
  contenido: string;
  contenido_anterior: string;
  descripcion: string;
  descripcion_anterior: string;
  file: any;
  img_url: string;
}
