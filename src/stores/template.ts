import {create} from 'zustand';
import {MemeTemplate} from '../types';

interface TemplateStore {
  selectedTemplate: MemeTemplate | null;
  setSelectedTemplate: (template: MemeTemplate | null) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  selectedTemplate: null,
  setSelectedTemplate: (template) => set({selectedTemplate: template}),
}));
