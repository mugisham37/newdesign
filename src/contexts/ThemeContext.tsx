/**
 * Theme Context for managing theme state across the application
 */

'use client';

import React, { createContext } from 'react';
import { ThemeContextType } from '@/types/theme';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
