import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const tableSearchParams = {
  page: parseAsInteger.withDefault(0),
  rows: parseAsInteger.withDefault(10),
  searchQuery: parseAsString,
};

export const loadSearchParams = createLoader(tableSearchParams);

export const recordTableSearchParams = {
  page: parseAsInteger.withDefault(0),
  rows: parseAsInteger.withDefault(20),
  searchQuery: parseAsString,
  action: parseAsString,
  entityType: parseAsString,
  order: parseAsString.withDefault('desc'),
};

export const loadRecordSearchParams = createLoader(recordTableSearchParams);
