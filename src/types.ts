export type ElementType = 'image' | 'text'

export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  width: number;
  height: number;
}

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  rotation: number;
  scale: number;
  width?: number;
  backgroundColor?: string;
}

export interface ImageElement {
  id: string;
  uri: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  opacity: number;
}

export interface CanvasState {
  template: MemeTemplate | null;
  textElements: TextElement[];
  imageElements: ImageElement[];
  scale: number;
  translateX: number;
  translateY: number;
}
