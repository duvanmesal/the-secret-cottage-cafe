import { create } from 'zustand'

interface CafeStore {
  /** ID of the currently selected coffee, or null if nothing is selected. */
  selectedCoffeeId: string | null
  /** Set the selected coffee by ID. Pass null to deselect. */
  setSelectedCoffee: (id: string | null) => void
}

export const useCafeStore = create<CafeStore>()((set) => ({
  selectedCoffeeId: null,
  setSelectedCoffee: (id) => set({ selectedCoffeeId: id }),
}))
