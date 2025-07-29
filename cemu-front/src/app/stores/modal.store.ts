import { create } from 'zustand';
import { ModalFormType } from '../utils/modals.utils';

type GlobalModalState = {
  open: boolean;
  title: string;
  formType: ModalFormType | null;
  data?: any;
  openModal: (formType: ModalFormType, title: string, data?: unknown) => void;
  closeModal: () => void;
};

const useGlobalModalStore = create<GlobalModalState>(set => ({
  open: false,
  title: '',
  formType: null,
  data: undefined,
  openModal: (formType, title, data) =>
    set({ open: true, formType, title, data }),
  closeModal: () =>
    set({ open: false, formType: null, title: '', data: undefined }),
}));

export default useGlobalModalStore;
