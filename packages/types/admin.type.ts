export type IAdmin = {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
};

export type ILoginRequest = {
  username: string;
  password: string;
};

export type IAdminResponse = Omit<IAdmin, "passwordHash">;