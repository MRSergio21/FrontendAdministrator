'use client';

import { UserContext } from '../context/UserContext';
import type { JWTPayloadDTO } from '../models/token.models';

export const UserProvider = ({
  user,
  children,
}: {
  user: JWTPayloadDTO;
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
