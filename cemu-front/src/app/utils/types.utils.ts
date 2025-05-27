import { ReactNode } from 'react';

export type ActionFunction = (index: number, handleClose: () => void) => void;

export interface Action {
  id: string;
  name: string;
  onClick: ActionFunction;
  outsideMenu: boolean;
  canPerform?: boolean | null;
  icon?: ReactNode;
  disabled?: boolean;
}
export interface IRowActionsMenu {
  index: number;
  actions: Action[] | undefined;
  tableName?: string;
}

export interface Column {
  id: string;
  label: string;
  icon?: ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}
export interface Column {
  id: string;
  label: string;
  icon?: ReactNode;
  sortable?: boolean;
}

export interface Data {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export interface TableProps<T extends Data> {
  columns: Column[];
  data: T[];
  totalCount: number;
  actions?: Action[] | ((row: T, index: number) => Action[]);
  rowsPerPage: number;
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  rowsPerPageOptions: number[];
  isLoading: boolean;
  SkeletonRow: () => React.ReactNode;
  tableName?: string;
  sortBy?: string;
  orderDirection?: 'asc' | 'desc';
  handleChangeSort?: (columnId: string) => void;
  height?: string;
  collapsible?: boolean;
  renderRowDetail?: (row: T) => React.ReactNode;
}
