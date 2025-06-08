import { create } from "zustand";
interface UserData {
  email: string;
  user_id: string;
  name: string;
}
interface UserStore {
  user: UserData | undefined;
  setUser: (user: UserData) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user) => {
   
    set({ user: { ...user } });
  },
  clearUser: () => set({ user: undefined }),
}));
