import { create } from 'zustand';
import type { Organization, Project } from '../types';

interface ProjectState {
  activeOrganization: Organization | null;
  activeProject: Project | null;
  projects: Project[];
  isLoading: boolean;
  setActiveOrganization: (org: Organization | null) => void;
  setActiveProject: (project: Project | null) => void;
  setProjects: (projects: Project[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  activeOrganization: null,
  activeProject: null,
  projects: [],
  isLoading: false,
  setActiveOrganization: (org) => set({ activeOrganization: org }),
  setActiveProject: (project) => set({ activeProject: project }),
  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
