import { MemeTemplate } from '../types';

export type RootStackParamList={
  MemeCanvas: {selectedTemplate?: MemeTemplate};
  TemplateSelection: {onGoBack?: (template:MemeTemplate)=>void};
};
