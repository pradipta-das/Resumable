import React from 'react'
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  Folder,
  Award,
  Globe,
  Plus,
  Minus,
  GripVertical,
  Trash2,
  Edit,
  Save,
  Eye,
  Download,
  Copy,
  Settings,
  LucideIcon
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  user: User,
  'file-text': FileText,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  code: Code,
  folder: Folder,
  award: Award,
  globe: Globe,
  plus: Plus,
  minus: Minus,
  'grip-vertical': GripVertical,
  trash: Trash2,
  edit: Edit,
  save: Save,
  eye: Eye,
  download: Download,
  copy: Copy,
  settings: Settings,
}

interface IconProps {
  name: string
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className }: IconProps) {
  const IconComponent = iconMap[name]
  
  if (!IconComponent) {
    return <div className={className} style={{ width: size, height: size }} />
  }
  
  return <IconComponent size={size} className={className} />
}