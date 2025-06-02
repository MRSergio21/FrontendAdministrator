'use client';

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
  Collapse,
} from '@mui/material';
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { Column, Data, TableProps } from '@/app/utils/types.utils';
import TablePaginationActions from './TablePaginationActions';
import RowActionsMenu from './RowActionsMenu';

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
  sortBy,
  orderDirection,
  handleChangeSort,
  height = '62vh',
  collapsible = false,
  renderRowDetail,
}: TableProps<T>) {
  const [openRows, setOpenRows] = useState<Record<number, boolean>>({});

  const toggleRow = (idx: number) => {
    setOpenRows(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const renderCell = (column: Column, row: T) => {
    const value = row[column.id];
    return value ?? '-';
  };

  const containerSx = {
    height,
    maxWidth: '100%',
    borderBottom: 'none',
    borderRadius: '4px 4px 0 0',
    border: '1px solid #E0E0E0',
    fontSize: '13px',
  };

  const cellSx = {
    backgroundColor: '#fff',
    padding: '8px',
    fontSize: '13px',
    width: '148px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    height: '28px',
  };

  const headerCellSx = {
    ...cellSx,
    cursor: 'default',
    backgroundColor: '#E0E0E0',
  };

  const rowSx = { height: '12px' };
  const paginationSx = {
    backgroundColor: '#fff',
    borderRadius: '0 0 4px 4px',
    border: '1px solid #E0E0E0',
  };

  return (
    <Box
      key={tableName}
      sx={{ backgroundColor: '#fff', borderRadius: '0 0 4px 4px' }}
    >
      <TableContainer sx={containerSx}>
        <Table
          stickyHeader
          aria-label='collapsible table'
          sx={{ minWidth: 500 }}
        >
          <TableHead>
            <TableRow sx={rowSx}>
              {collapsible && <TableCell sx={headerCellSx} />}
              {/* expand arrow header */}
              {columns.map(col => (
                <TableCell key={col.id} align={col.align} sx={headerCellSx}>
                  {col.sortable && handleChangeSort ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: col.align || 'left',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleChangeSort(col.id)}
                    >
                      <Box>{col.label}</Box>
                      <Box sx={{ ml: 0.5 }}>
                        {sortBy === col.id ? (
                          orderDirection === 'asc' ? (
                            <ArrowUpwardIcon fontSize='small' />
                          ) : (
                            <ArrowDownwardIcon fontSize='small' />
                          )
                        ) : (
                          <ArrowDownwardIcon
                            fontSize='small'
                            sx={{ opacity: 0.5 }}
                          />
                        )}
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: col.align || 'left',
                        alignItems: 'center',
                      }}
                    >
                      {col.icon && <Box sx={{ mr: 0.5 }}>{col.icon}</Box>}
                      <Box>{col.label}</Box>
                    </Box>
                  )}
                </TableCell>
              ))}
              {actions && <TableCell sx={headerCellSx} />}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ? Array.from({ length: rowsPerPage }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
              : data.map((row, rowIndex) => {
                  const isOpen = Boolean(openRows[rowIndex]);
                  const rowActions =
                    typeof actions === 'function'
                      ? actions(row, rowIndex)
                      : actions;

                  return (
                    <React.Fragment key={rowIndex}>
                      <TableRow>
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
                        <TableRow>
                          <TableCell
                            colSpan={
                              /* collapse + columns + actions */
                              1 + columns.length + (rowActions ? 1 : 0)
                            }
                            sx={{ p: 0, border: 'none' }}
                          >
                            <Collapse in={isOpen} timeout='auto' unmountOnExit>
                              <Box sx={{ p: 2 }}>{renderRowDetail(row)}</Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>

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
  );
}
