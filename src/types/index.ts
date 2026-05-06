import type React from 'react';

export type GravityType = 'left' | 'down' | 'right' | null;

export interface TimelineStep {
  title: string;
  company: string;
  date: string;
  description: React.ReactNode;
  color: string;
  planetColor: string;
  logo?: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  color: string;
  radius: number;
  duration: number;
  skills: string[];
  planetColor?: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  type: 'copy' | 'link';
  href?: string;
}
