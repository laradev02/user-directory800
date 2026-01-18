export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}

export interface Meta {
  powered_by: string;
  docs_url: string;
  upgrade_url: string;
  example_url: string;
  variant: string;
  message: string;
  cta?: {
    label: string;
    url: string;
  };
  context: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support?: Support;
  _meta?: Meta;
}

export interface UserResponse {
  data: User;
  support?: Support;
}

export interface VerifyTokenRequest {
  token: string;
}

export interface VerifyTokenResponse {
  success?: boolean;
  message?: string;
  user?: User;
  [key: string]: any; // Allow for additional response fields
}
