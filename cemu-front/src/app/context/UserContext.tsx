'use client';

import { createContext, useContext } from 'react';
import type { JWTPayloadDTO } from '../models/token.models';

export const UserContext = createContext<JWTPayloadDTO | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within <UserProvider>');
  return context;
};
