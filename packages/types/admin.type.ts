export type IAdmin = {
  id: string;
  username: string;
  password_hash: string;
  created_at: string;
};

export type ILoginRequest = {
  username: string;
  password: string;
};

export type IAdminResponse = Omit<IAdmin, "password_hash">;