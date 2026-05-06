import type React from 'react';

export type GravityType = 'left' | 'down' | 'right' | 'up' | null;

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

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  type: string;
  details: {
    problem: React.ReactNode;
    solution: React.ReactNode;
    tech?: React.ReactNode;
    stats?: { label: string; value: string }[];
    images?: { url: string; caption: string }[];
  };
}
