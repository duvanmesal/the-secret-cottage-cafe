export type GalleryTag =
  | 'interior'
  | 'coffee'
  | 'pastry'
  | 'garden'
  | 'detail'
  | 'atmosphere'

export interface GalleryItem {
  id: string
  title: string
  description: string
  imageAlt: string
  tags: GalleryTag[]
  aspectRatio: 'portrait' | 'landscape' | 'square'
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-morning-light',
    title: 'Morning Light',
    description: 'First light through the cottage window, landing on a ceramic cup still steaming.',
    imageAlt: 'Morning light through a cottage window onto a hand-thrown ceramic coffee cup',
    tags: ['interior', 'coffee', 'atmosphere'],
    aspectRatio: 'portrait',
  },
  {
    id: 'gallery-the-pour',
    title: 'The Pour',
    description: 'Hands holding a gooseneck kettle over a pour-over, water tracing slow circles.',
    imageAlt: 'Close-up of hands pouring hot water in slow circles over a pour-over coffee filter',
    tags: ['coffee', 'detail'],
    aspectRatio: 'landscape',
  },
  {
    id: 'gallery-cardamom-buns',
    title: 'Fresh From the Oven',
    description: 'A tray of cardamom morning buns, dusted and twisted, still warm from the oven.',
    imageAlt: 'Tray of freshly baked cardamom morning buns dusted with sugar on a wooden surface',
    tags: ['pastry', 'detail'],
    aspectRatio: 'square',
  },
  {
    id: 'gallery-garden-path',
    title: 'The Path In',
    description: 'The garden path at dawn — roses on either side, the cottage door just visible.',
    imageAlt: 'Narrow garden path at dawn with roses in bloom leading to a cottage door',
    tags: ['garden', 'atmosphere'],
    aspectRatio: 'portrait',
  },
  {
    id: 'gallery-two-cups',
    title: 'Two Cups, One Table',
    description: 'Two ceramic cups on a worn wooden table by a fogged window. Nothing else needed.',
    imageAlt: 'Two ceramic coffee cups on a worn wooden table beside a fogged cottage window',
    tags: ['interior', 'coffee', 'atmosphere'],
    aspectRatio: 'landscape',
  },
  {
    id: 'gallery-cottage-exterior',
    title: 'The Cottage',
    description: 'The exterior at autumn dusk — stone walls, ivy, and warm light behind the glass.',
    imageAlt: 'Stone cottage exterior at autumn dusk with ivy on the walls and warm light in the windows',
    tags: ['garden', 'atmosphere', 'interior'],
    aspectRatio: 'landscape',
  },
]
