export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
}

export interface ProfessionalSummary {
  summary: string;
}

export interface WorkExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  hightlights: string[];
}

export interface WorkExperience {
  experiences: WorkExperienceItem[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  achivements?: string[];
  gpa?: string;
}

export interface Education {
  education: EducationItem[];
}

export type skillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface SkillItem {
  id: string;
  name: string;
  level: skillLevel;
  category: string;
}

export interface Skills {
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  role: string;
  url?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  highlights: string[];
}

export interface Projects {
  projects: ProjectItem[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary?: ProfessionalSummary;
  workExperience?: WorkExperience;
  education?: Education;
  skills: Skills;
  projects?: Projects;
  lastSaved?: Date;
}
