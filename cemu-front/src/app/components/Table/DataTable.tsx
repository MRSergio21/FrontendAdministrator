import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TableSortLabel,
  Collapse,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import TablePaginationActions from './TablePaginationActions';
import RowActionsMenu from './RowActionsMenu';
import EmptyState from './EmptyState';
import { Column, Data, TableProps } from '@/app/utils/types.utils';

export function DataTable<T extends Data>({
  columns,
  data,
  totalCount,
  actions,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPageOptions,
  isLoading,
  SkeletonRow,
  tableName,
  orderDirection,
  handleChangeSort,
  collapsible = false,
  rounded = true,
  renderRowDetail,
}: TableProps<T>) {
  const [openRows, setOpenRows] = useState<Record<number, boolean>>({});

  const toggleRow = (idx: number) =>
    setOpenRows(prev => ({ ...prev, [idx]: !prev[idx] }));

  const renderCell = (column: Column, row: T) => {
    if (column.render) {
      return column.render(row[column.id], row);
    }
    const value = row[column.id];
    return value ?? '-';
  };

  const cellHeight = '50px';

  const headerCellSx = {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: '#E0E0E0',
    paddingY: '8px',
    paddingX: '16px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    height: cellHeight,
    maxWidth: '100%',
  };

  const cellSx = {
    backgroundColor: '#fff',
    paddingY: '5px',
    paddingX: '16px',
    fontSize: '13px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    height: cellHeight,
  };
  const rowSx = { height: cellHeight };
  const paginationSx = {
    'backgroundColor': '#fff',
    'borderRadius': rounded ? '0 0 8px 8px' : 0,
    'border': '1px solid #E0E0E0',
    '& .MuiTablePagination-select': {
      color: '#424242',
    },
  };

  // total columns (for EmptyState and collapse rows)
  const totalCols = columns.length + (collapsible ? 1 : 0) + (actions ? 1 : 0);

  return (
    <Box
      key={tableName}
      sx={{
        backgroundColor: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0, // <— critical for flex children to shrink
      }}
    >
      {/* Scrollable table area */}
      <Box
        sx={{
          flex: 1,
          minHeight: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        <TableContainer
          sx={{
            height: '100%',
            overflowY: 'auto',
            overflowX: 'auto',
            borderTop: '1px solid #E0E0E0',
            borderLeft: '1px solid #E0E0E0',
            borderRight: '1px solid #E0E0E0',
            borderRadius: rounded ? '8px 8px 0 0' : 0,
            fontSize: '13px',
          }}
        >
          <Table
            stickyHeader
            sx={{ tableLayout: 'auto', width: '100%', minWidth: 'max-content' }}
          >
            <TableHead>
              <TableRow sx={rowSx}>
                {collapsible && <TableCell sx={headerCellSx} />}
                {columns.map(col => (
                  <TableCell
                    key={col.id}
                    align={col.align}
                    sx={{
                      ...headerCellSx,
                    }}
                  >
                    {col.sortable && handleChangeSort ? (
                      <TableSortLabel
                        active={true}
                        direction={orderDirection}
                        onClick={() => handleChangeSort(col.id)}
                        sx={{
                          display: 'flex',
                          justifyContent: col.align ?? 'left',
                          width: '100%',
                        }}
                      >
                        {col.label}
                      </TableSortLabel>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: col.align ?? 'left',
                          width: '100%',
                        }}
                      >
                        {col.icon && <Box sx={{ mr: 0.5 }}>{col.icon}</Box>}
                        {col.label}
                      </Box>
                    )}
                  </TableCell>
                ))}
                {actions && <TableCell sx={headerCellSx} />}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                Array.from({ length: rowsPerPage }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
              ) : data.length > 0 ? (
                data.map((row, rowIndex) => {
                  const isOpen = Boolean(openRows[rowIndex]);
                  const rowActions =
                    typeof actions === 'function'
                      ? actions(row, rowIndex)
                      : actions;

                  return (
                    <React.Fragment key={rowIndex}>
                      <TableRow sx={rowSx}>
                        {collapsible && (
                          <TableCell sx={cellSx}>
                            <IconButton
                              size='small'
                              onClick={() => toggleRow(rowIndex)}
                            >
                              {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                          </TableCell>
                        )}

                        {columns.map(col => (
                          <TableCell key={col.id} align={col.align} sx={cellSx}>
                            {renderCell(col, row)}
                          </TableCell>
                        ))}

                        {rowActions && (
                          <TableCell align='right' sx={cellSx}>
                            <RowActionsMenu
                              index={rowIndex}
                              actions={rowActions}
                            />
                          </TableCell>
                        )}
                      </TableRow>

                      {collapsible && isOpen && renderRowDetail && (
                        <TableRow sx={rowSx}>
                          <TableCell
                            colSpan={totalCols}
                            sx={{ p: 0, border: 'none' }}
                          >
                            <Collapse in={isOpen} timeout='auto' unmountOnExit>
                              <Box sx={{ p: 0 }}>{renderRowDetail(row)}</Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <EmptyState
                  title='No hay datos para mostrar'
                  colLength={totalCols}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Static Pagination Bar at Bottom */}
      <Box sx={{ flexShrink: 0 }}>
        <TablePagination
          component='div'
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          ActionsComponent={TablePaginationActions}
          labelRowsPerPage='Filas por página:'
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
          sx={paginationSx}
        />
      </Box>
    </Box>
  );
}
