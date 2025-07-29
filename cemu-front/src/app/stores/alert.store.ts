import { create } from 'zustand';

interface AlertState {
  message: string | null;
  severity: 'error' | 'success' | 'info' | 'warning';
  show: boolean;
  setAlert: (message: string, severity?: AlertState['severity']) => void;
  clearAlert: () => void;
}

export const useAlertStore = create<AlertState>(set => ({
  message: null,
  severity: 'error',
  show: false,
  setAlert: (message, severity = 'error') =>
    set({ message, severity, show: true }),
  clearAlert: () => set({ show: false, message: null }),
}));
