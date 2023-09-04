import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Profile {
  user: any;
  setUser: any;
}

export const useUserStore = create<Profile>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: any) =>
          set((state: any) => ({
            user: user,
          })),
      }),
      {
        name: "user-storage",
      }
    )
  )
);
