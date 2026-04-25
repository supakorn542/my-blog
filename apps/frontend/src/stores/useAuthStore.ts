import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { IAdminResponse } from "@my-blog/types";

type AuthState = {
  admin: IAdminResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAdmin: (admin: IAdminResponse | null) => void;
  loginSuccess: (admin: IAdminResponse) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};


export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  isAuthenticated: false,
  isLoading: true,

  setAdmin: (admin) => set({ admin, isAuthenticated: !!admin, isLoading: false }),

  loginSuccess: (admin) => set({ admin, isAuthenticated: true, isLoading: false }),

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } finally {
      set({ admin: null, isAuthenticated: false, isLoading: false });
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });

      const response = await axiosInstance.get<IAdminResponse>('/auth/profile');
      set({ admin: response.data, isAuthenticated: true });
    } catch (error) {
      set({ admin: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));