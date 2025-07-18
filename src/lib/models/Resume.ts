import mongoose, { Schema, Document } from 'mongoose';
import { Resume, ResumeSectionData } from '@/types/resume';

const ResumeSectionDataSchema = new Schema<ResumeSectionData>({
  id: { type: String, required: true },
  sectionId: { type: String, required: true },
  order: { type: Number, required: true },
  data: { type: Schema.Types.Mixed, required: true }
});

const ResumeSchema = new Schema<Resume>({
  userId: { type: String, required: false },
  title: { type: String, required: true },
  template: { type: String, required: true, default: 'modern' },
  sections: [ResumeSectionDataSchema]
}, {
  timestamps: true
});

export const ResumeModel = mongoose.models.Resume || mongoose.model<Resume>('Resume', ResumeSchema);