import { create } from 'zustand';

export type PerformanceMode = 'high' | 'medium' | 'low';

export interface AppState {
  activeSection: string;
  isCommandPaletteOpen: boolean;
  reducedMotion: boolean;
  performanceMode: PerformanceMode;
  selectedProject: string | null;
  cursorHovered: boolean;
  cursorText: string | null;
  webglAvailable: boolean;

  // Actions
  setActiveSection: (section: string) => void;
  setIsCommandPaletteOpen: (isOpen: boolean) => void;
  toggleCommandPalette: () => void;
  setReducedMotion: (reduced: boolean) => void;
  setPerformanceMode: (mode: PerformanceMode) => void;
  setSelectedProject: (projectId: string | null) => void;
  setCursorHovered: (hovered: boolean, text?: string | null) => void;
  setWebglAvailable: (available: boolean) => void;
}

export const usePortfolioStore = create<AppState>((set) => ({
  activeSection: 'hero',
  isCommandPaletteOpen: false,
  reducedMotion: false,
  performanceMode: 'high',
  selectedProject: null,
  cursorHovered: false,
  cursorText: null,
  webglAvailable: true,

  setActiveSection: (section) => set({ activeSection: section }),
  setIsCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),
  toggleCommandPalette: () =>
    set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setPerformanceMode: (mode) => set({ performanceMode: mode }),
  setSelectedProject: (projectId) => set({ selectedProject: projectId }),
  setCursorHovered: (hovered, text = null) =>
    set({ cursorHovered: hovered, cursorText: text }),
  setWebglAvailable: (available) => set({ webglAvailable: available }),
}));
