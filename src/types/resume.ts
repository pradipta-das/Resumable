export interface ResumeField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'date' | 'textarea' | 'checkbox' | 'select' | 'array';
  required: boolean;
  placeholder?: string;
  options?: string[];
  itemFields?: ResumeField[];
}

export interface ResumeSection {
  id: string;
  title: string;
  icon: string;
  required: boolean;
  repeatable?: boolean;
  fields: ResumeField[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}

export interface ResumeSchema {
  sections: Record<string, ResumeSection>;
  templates: Record<string, ResumeTemplate>;
}

export interface ResumeSectionData {
  id: string;
  sectionId: string;
  order: number;
  data: Record<string, any>;
}

export interface Resume {
  _id?: string;
  userId?: string;
  title: string;
  template: string;
  sections: ResumeSectionData[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DragItem {
  id: string;
  type: 'section' | 'available-section';
  sectionId: string;
  order?: number;
}