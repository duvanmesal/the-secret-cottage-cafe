export type MenuCategory =
  | 'espresso'
  | 'pour-over'
  | 'cold'
  | 'seasonal-special'
  | 'pastry'

export interface MenuItem {
  id: string
  name: string
  category: MenuCategory
  shortDescription: string
  longDescription: string
  price: string
  ingredients: string[]
  visualTheme: {
    mood: string
    season: string
    palette: string[]
  }
  cupColor: string
  accentColor: string
  floatingElements: string[]
  splineSceneKey: string
}

export const menuItems: MenuItem[] = [
  {
    id: 'honey-lavender-latte',
    name: 'Honey Lavender Latte',
    category: 'seasonal-special',
    shortDescription: 'Soft floral, golden sweet, morning calm.',
    longDescription:
      'A double shot of our house espresso pulled into steamed oat milk, finished with raw wildflower honey and a touch of dried lavender syrup. Served in our wide-bowl ceramic with a single lavender sprig.',
    price: '£5.80',
    ingredients: [
      'Double espresso',
      'Steamed oat milk',
      'Wildflower honey',
      'Lavender syrup',
      'Dried lavender',
    ],
    visualTheme: {
      mood: 'dreamy, soft, garden morning',
      season: 'spring',
      palette: ['#D8C3A5', '#C98F7A', '#A7B89A'],
    },
    cupColor: '#E8DDD0',
    accentColor: '#C98F7A',
    floatingElements: ['lavender sprig', 'honey drip', 'steam curl'],
    splineSceneKey: 'cup-honey-lavender',
  },
  {
    id: 'forest-mocha',
    name: 'Forest Mocha',
    category: 'espresso',
    shortDescription: 'Dark, earthy, a walk through the woods.',
    longDescription:
      'Espresso blended with single-origin dark cacao and a whisper of black cardamom, topped with textured whole-milk foam and a fine dusting of cacao powder. Deep and grounding.',
    price: '£5.40',
    ingredients: [
      'Double espresso',
      'Single-origin dark cacao',
      'Black cardamom',
      'Whole milk foam',
      'Cacao powder',
    ],
    visualTheme: {
      mood: 'dark, earthy, grounding, mysterious',
      season: 'autumn',
      palette: ['#241A14', '#5A3E2B', '#3F5D45'],
    },
    cupColor: '#3A2A1E',
    accentColor: '#5A3E2B',
    floatingElements: ['cacao dust', 'cardamom pod', 'oak leaf', 'steam'],
    splineSceneKey: 'cup-forest-mocha',
  },
  {
    id: 'rose-vanilla-cappuccino',
    name: 'Rose Vanilla Cappuccino',
    category: 'espresso',
    shortDescription: 'Petal-soft. Warm vanilla. Perfect foam.',
    longDescription:
      'A traditional dry cappuccino elevated with a hint of rose water and Madagascan vanilla. The foam is dense and cloud-like. Finished with a pressed dried rose petal on top.',
    price: '£5.20',
    ingredients: [
      'Double espresso',
      'Whole milk dry foam',
      'Rose water',
      'Madagascan vanilla',
      'Dried rose petal',
    ],
    visualTheme: {
      mood: 'romantic, soft, feminine, warm',
      season: 'spring',
      palette: ['#F5EFE6', '#C98F7A', '#D8C3A5'],
    },
    cupColor: '#F0E8E0',
    accentColor: '#C98F7A',
    floatingElements: ['rose petal', 'vanilla pod', 'foam cloud', 'steam'],
    splineSceneKey: 'cup-rose-vanilla',
  },
  {
    id: 'cinnamon-hearth-latte',
    name: 'Cinnamon Hearth Latte',
    category: 'seasonal-special',
    shortDescription: 'The fireplace in a cup.',
    longDescription:
      'Slow-brewed espresso with house-made cinnamon bark syrup, steamed whole milk, and a finish of star anise and nutmeg. Named after the cottage fireplace where the first batch was made.',
    price: '£5.60',
    ingredients: [
      'Double espresso',
      'Steamed whole milk',
      'Cinnamon bark syrup',
      'Star anise',
      'Ground nutmeg',
    ],
    visualTheme: {
      mood: 'cozy, warm, fireside, wintery',
      season: 'winter',
      palette: ['#5A3E2B', '#D8C3A5', '#C98F7A'],
    },
    cupColor: '#C8A882',
    accentColor: '#5A3E2B',
    floatingElements: ['cinnamon stick', 'star anise', 'steam', 'nutmeg dust'],
    splineSceneKey: 'cup-cinnamon-hearth',
  },
  {
    id: 'garden-cream-cold-brew',
    name: 'Garden Cream Cold Brew',
    category: 'cold',
    shortDescription: 'Slow-steeped, cloud-topped, endlessly smooth.',
    longDescription:
      'Kenyan AA beans steeped cold for 18 hours, served over a single large ice cube in a tall ceramic glass. Topped with lightly sweetened cream infused with fresh herbs from our garden — rosemary or thyme, depending on the season.',
    price: '£5.90',
    ingredients: [
      'Kenyan AA cold brew (18h steep)',
      'Single large ice cube',
      'Sweet herb cream',
      'Fresh rosemary or thyme',
    ],
    visualTheme: {
      mood: 'fresh, airy, bright, garden afternoon',
      season: 'summer',
      palette: ['#A7B89A', '#F5EFE6', '#3F5D45'],
    },
    cupColor: '#D4E0D0',
    accentColor: '#3F5D45',
    floatingElements: ['herb sprig', 'cream swirl', 'ice cube', 'condensation'],
    splineSceneKey: 'cup-garden-cold-brew',
  },
]
