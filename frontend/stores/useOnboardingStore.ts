import { create } from 'zustand';
import type { OnboardingStep, StepConfig, ProjectIdea, ProjectContext, ProjectStrategy } from '@/types';

const initialSteps: StepConfig[] = [
  { id: 1, name: 'Idea', description: 'Describe your app idea', isCompleted: false },
  { id: 2, name: 'Context', description: 'Define project context', isCompleted: false },
  { id: 3, name: 'PRD', description: 'Review requirements', isCompleted: false },
  { id: 4, name: 'Strategy', description: 'Select implementation', isCompleted: false },
  { id: 5, name: 'Artifacts', description: 'Generate documents', isCompleted: false },
  { id: 6, name: 'Route', description: 'Plan execution', isCompleted: false },
];

interface OnboardingStore {
  currentStep: OnboardingStep;
  steps: StepConfig[];
  idea: Partial<ProjectIdea>;
  context: Partial<ProjectContext>;
  strategy: Partial<ProjectStrategy>;
  isStepValid: boolean;

  setCurrentStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  markStepCompleted: (step: OnboardingStep) => void;
  updateIdea: (data: Partial<ProjectIdea>) => void;
  updateContext: (data: Partial<ProjectContext>) => void;
  updateStrategy: (data: Partial<ProjectStrategy>) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  currentStep: 1,
  steps: initialSteps,
  idea: {},
  context: {},
  strategy: {},
  isStepValid: false,

  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () => set((state) => ({
    currentStep: state.currentStep < 6 ? (state.currentStep + 1) as OnboardingStep : state.currentStep,
  })),

  previousStep: () => set((state) => ({
    currentStep: state.currentStep > 1 ? (state.currentStep - 1) as OnboardingStep : state.currentStep,
  })),

  markStepCompleted: (step) => set((state) => ({
    steps: state.steps.map((s) =>
      s.id === step ? { ...s, isCompleted: true } : s
    ),
  })),

  updateIdea: (data) => set((state) => ({
    idea: { ...state.idea, ...data },
  })),

  updateContext: (data) => set((state) => ({
    context: { ...state.context, ...data },
  })),

  updateStrategy: (data) => set((state) => ({
    strategy: { ...state.strategy, ...data },
  })),

  resetOnboarding: () => set({
    currentStep: 1,
    steps: initialSteps,
    idea: {},
    context: {},
    strategy: {},
    isStepValid: false,
  }),
}));
