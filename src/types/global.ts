// Global types for forms, state management, and utility functions

// Contact form data interface
export interface FormData {
  name: string;
  email: string;
  message: string;
}

// Alert state interface
export interface AlertState {
  show: boolean;
  type: "success" | "error" | "warning" | "info" | "danger";
  message: string;
}

// Loading state interface
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

// EmailJS template parameters
export interface EmailJSParams {
  from_name: string;
  to_name: string;
  from_email: string;
  to_email: string;
  message: string;
}

// Generic API response interface
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Event handler types
export type ChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;
export type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
export type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Animation timing types
export interface AnimationTiming {
  duration?: number;
  delay?: number;
  ease?: string | number[];
}

// Responsive breakpoint types
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

// Theme color types
export type ThemeColor =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info";

// Navigation link interface
export interface NavLink {
  href: string;
  label: string;
  isActive?: boolean;
}

// SEO metadata interface
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// Environment variables interface
export interface EnvironmentVariables {
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: string;
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: string;
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: string;
}

// Generic error interface
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: Date;
}
