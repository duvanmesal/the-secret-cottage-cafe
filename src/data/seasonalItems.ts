export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export type SeasonalCategory = 'drink' | 'pastry' | 'preserve' | 'set'

export interface SeasonalItem {
  id: string
  name: string
  season: Season
  category: SeasonalCategory
  tagline: string
  description: string
  price: string
  available: string
  palette: string[]
  accentColor: string
  notes: string[]
}

export const seasonalItems: SeasonalItem[] = [
  {
    id: 'spring-blossom-set',
    name: 'Spring Blossom Breakfast Set',
    season: 'spring',
    category: 'set',
    tagline: 'The garden wakes. So do you.',
    description:
      'A curated spring morning: Honey Lavender Latte, a warm cardamom bun straight from the oven, and a small pot of our rose-petal jam. Everything served on our hand-thrown spring tray.',
    price: '£13.50',
    available: 'March through May',
    palette: ['#F5EFE6', '#C98F7A', '#A7B89A'],
    accentColor: '#C98F7A',
    notes: ['rose-petal jam', 'lavender honey', 'cardamom bun'],
  },
  {
    id: 'summer-herb-cold-brew',
    name: 'Garden Herb Cold Brew Flight',
    season: 'summer',
    category: 'drink',
    tagline: 'Three glasses. All from the garden.',
    description:
      'A flight of three small Garden Cream Cold Brews, each topped with a different herb cream from our kitchen garden — rosemary, thyme, and lemon verbena. Served with a small card naming each herb and where it grows.',
    price: '£9.80',
    available: 'June through August',
    palette: ['#A7B89A', '#3F5D45', '#F5EFE6'],
    accentColor: '#3F5D45',
    notes: ['rosemary cream', 'thyme cream', 'lemon verbena cream'],
  },
  {
    id: 'autumn-fig-tart',
    name: 'Autumn Fig & Brown Butter Tart',
    season: 'autumn',
    category: 'pastry',
    tagline: 'Gone when the last fig falls.',
    description:
      'A short-crust tart shell filled with brown butter frangipane and topped with halved fresh figs, a brushing of dark honey, and a pinch of fleur de sel. Baked in small batches from early September. Pairs perfectly with the Cinnamon Hearth Latte.',
    price: '£6.20',
    available: 'September through November',
    palette: ['#5A3E2B', '#D8C3A5', '#C98F7A'],
    accentColor: '#5A3E2B',
    notes: ['brown butter frangipane', 'fresh fig', 'dark honey', 'fleur de sel'],
  },
  {
    id: 'winter-spiced-preserve',
    name: 'Winter Spiced Marmalade',
    season: 'winter',
    category: 'preserve',
    tagline: 'A jar of the cottage to take home.',
    description:
      'Seville orange marmalade made in our kitchen each January, slow-cooked with cinnamon, clove, and a sliver of star anise. Jarred by hand and labeled with the batch date. Available to purchase or served with our brown butter scone through the winter months.',
    price: '£7.50 (jar)',
    available: 'December through February',
    palette: ['#5A3E2B', '#F5EFE6', '#D8C3A5'],
    accentColor: '#C98F7A',
    notes: ['Seville orange', 'cinnamon', 'clove', 'star anise'],
  },
]
