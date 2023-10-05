export interface UserInterface {
  id: string;
  email: string;
  password?: string;
  name: string;
  user_name: string;
  created_at?: Date;
  updated_at?: Date;
  role_name?: string;
}

export interface TransformedUserInterface {
  id: string;
  email: string;
  name: string;
  user_name: string;
  user_agent?: string;
  role?: string;
  created_at: string;
  updated_at: string;
}

export interface JWT {
  session_id: string;
  user_id: string;
  role_id: string;
}
