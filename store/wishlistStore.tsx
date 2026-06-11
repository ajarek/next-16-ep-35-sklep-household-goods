import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { Product } from "@/types/typeProduct"

type WishlistState = {
  items: Product[]
  toggleWishlist: (item: Product) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (item: Product) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id)
          if (exists) {
            return { items: state.items.filter((i) => i.id !== item.id) }
          }
          return { items: [item, ...state.items] }
        }),

      removeItem: (id: string) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      clearWishlist: () => set({ items: [] }),
    }),

    { name: "wishlistStore", storage: createJSONStorage(() => localStorage) },
  ),
)
