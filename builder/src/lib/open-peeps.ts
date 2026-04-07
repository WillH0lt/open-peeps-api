export interface AvatarConfig {
  head: number
  body: number
  face: number
  facialHair: number
  accessory: number
  skinColor?: string
  hairColor?: string
  topColor?: string
  jacketColor?: string
  hatColor?: string
  accessoryColor?: string
  backgroundColor?: string
}

export interface AvatarOption {
  value: number
  label: string
  slug: string
}

// ── Option catalogs ──────────────────────────────────────────

export const headOptions: AvatarOption[] = [
  { value: 1, slug: 'afro', label: 'Afro' },
  { value: 2, slug: 'bald', label: 'Bald' },
  { value: 3, slug: 'bangs', label: 'Bangs' },
  { value: 4, slug: 'bangs-two', label: 'Bangs 2' },
  { value: 5, slug: 'bantu-knots', label: 'Bantu Knots' },
  { value: 6, slug: 'beanie', label: 'Beanie' },
  { value: 8, slug: 'bun', label: 'Bun' },
  { value: 9, slug: 'bun-clip', label: 'Bun Clip' },
  { value: 10, slug: 'bun-knots', label: 'Bun Knots' },
  { value: 11, slug: 'bun-two', label: 'Bun 2' },
  { value: 12, slug: 'color-bun', label: 'Color Bun' },
  { value: 13, slug: 'color-medium', label: 'Color Medium' },
  { value: 15, slug: 'cornrows-light', label: 'Cornrows' },
  { value: 19, slug: 'dreads-one', label: 'Dreads 1' },
  { value: 20, slug: 'dreads-two', label: 'Dreads 2' },
  { value: 21, slug: 'flat-top', label: 'Flat Top' },
  { value: 22, slug: 'flat-top-long', label: 'Flat Top Long' },
  { value: 23, slug: 'gray-short', label: 'Gray Short' },
  { value: 24, slug: 'hat-hip', label: 'Big Hat' },
  { value: 25, slug: 'hijab', label: 'Hijab' },
  { value: 26, slug: 'long-afro', label: 'Long Afro' },
  { value: 27, slug: 'long-bangs', label: 'Long Bangs' },
  { value: 28, slug: 'long-curly', label: 'Long Curly' },
  { value: 29, slug: 'long-hair', label: 'Long Hair' },
  { value: 30, slug: 'medium-bangs', label: 'Medium Bangs' },
  { value: 31, slug: 'medium-bangs-color', label: 'Medium Bangs Color' },
  { value: 32, slug: 'medium-bangs-one', label: 'Medium Bangs 1' },
  { value: 33, slug: 'medium-one', label: 'Medium 1' },
  { value: 34, slug: 'medium-straight', label: 'Medium Straight' },
  { value: 35, slug: 'medium-three', label: 'Medium 3' },
  { value: 36, slug: 'medium-two', label: 'Medium 2' },
  { value: 37, slug: 'mohawk', label: 'Mohawk' },
  { value: 38, slug: 'mohawk-knots', label: 'Mohawk Knots' },
  { value: 39, slug: 'no-hair-three', label: 'No Hair 3' },
  { value: 40, slug: 'no-hair-two', label: 'No Hair 2' },
  { value: 41, slug: 'pomp', label: 'Pomp' },
  { value: 42, slug: 'shaved', label: 'Shaved' },
  { value: 43, slug: 'shaved-one', label: 'Shaved 1' },
  { value: 44, slug: 'shaved-three', label: 'Shaved 3' },
  { value: 45, slug: 'short-five', label: 'Short 5' },
  { value: 46, slug: 'short-four', label: 'Short 4' },
  { value: 47, slug: 'short-one', label: 'Short 1' },
  { value: 48, slug: 'short-three', label: 'Short 3' },
  { value: 49, slug: 'short-two', label: 'Short 2' },
  { value: 50, slug: 'turban', label: 'Turban' },
  { value: 51, slug: 'twists', label: 'Twists' },
  { value: 52, slug: 'twists-two', label: 'Twists 2' },
  { value: 53, slug: 'wavy', label: 'Wavy' },
]

export const faceOptions: AvatarOption[] = [
  { value: 1, slug: 'angry', label: 'Angry' },
  { value: 2, slug: 'angry-fang', label: 'Angry Fang' },
  { value: 3, slug: 'awe', label: 'Awe' },
  { value: 4, slug: 'big-smile', label: 'Big Smile' },
  { value: 5, slug: 'blank', label: 'Blank' },
  { value: 6, slug: 'calm', label: 'Calm' },
  { value: 7, slug: 'calm-with-mask', label: 'Calm w/ Mask' },
  { value: 8, slug: 'cheeky', label: 'Cheeky' },
  { value: 9, slug: 'cheers-with-mask', label: 'Cheers w/ Mask' },
  { value: 10, slug: 'concerned', label: 'Concerned' },
  { value: 11, slug: 'concerned-fear', label: 'Concerned Fear' },
  { value: 12, slug: 'contempt', label: 'Contempt' },
  { value: 13, slug: 'cute', label: 'Cute' },
  { value: 14, slug: 'cyclops', label: 'Cyclops' },
  { value: 15, slug: 'driven', label: 'Driven' },
  { value: 16, slug: 'eating-happy', label: 'Eating Happy' },
  { value: 17, slug: 'explaining', label: 'Explaining' },
  { value: 18, slug: 'eyes-closed', label: 'Eyes Closed' },
  { value: 19, slug: 'fear', label: 'Fear' },
  { value: 20, slug: 'hectic', label: 'Hectic' },
  { value: 21, slug: 'love-grin-teeth', label: 'Love Grin' },
  { value: 22, slug: 'love-grin-tongue', label: 'Love Tongue' },
  { value: 23, slug: 'monster', label: 'Monster' },
  { value: 24, slug: 'old', label: 'Old' },
  { value: 25, slug: 'rage', label: 'Rage' },
  { value: 26, slug: 'serious', label: 'Serious' },
  { value: 27, slug: 'smile', label: 'Smile' },
  { value: 28, slug: 'smile-lol', label: 'Smile LOL' },
  { value: 29, slug: 'smile-teeth', label: 'Smile Teeth' },
  { value: 30, slug: 'smile-with-mask', label: 'Smile w/ Mask' },
  { value: 31, slug: 'solemn', label: 'Solemn' },
  { value: 32, slug: 'suspicious', label: 'Suspicious' },
  { value: 33, slug: 'tired', label: 'Tired' },
]

export const bodyOptions: AvatarOption[] = [
  { value: 1, slug: 'blazer-black-tee', label: 'Blazer' },
  { value: 2, slug: 'button-pocket-shirt', label: 'Button Pocket' },
  { value: 6, slug: 'dress', label: 'Dress' },
  { value: 9, slug: 'gym-shirt', label: 'Gym Shirt' },
  { value: 10, slug: 'hoodie', label: 'Hoodie' },
  { value: 11, slug: 'jacket', label: 'Jacket' },
  { value: 15, slug: 'polkadot-jacket', label: 'Polkadot Jacket' },
  { value: 16, slug: 'polo-sweater', label: 'Polo Sweater' },
  { value: 17, slug: 'shirt-coat', label: 'Shirt Coat' },
  { value: 18, slug: 'sporty-tee', label: 'Sporty Tee' },
  { value: 19, slug: 'striped-tee', label: 'Striped Tee' },
  { value: 21, slug: 'sweater-dots', label: 'Sweater Dots' },
  { value: 22, slug: 'tee', label: 'Tee' },
  { value: 26, slug: 'turtleneck', label: 'Turtleneck' },
]

export const facialHairOptions: AvatarOption[] = [
  { value: 0, slug: '', label: 'None' },
  { value: 1, slug: 'chin', label: 'Chin' },
  { value: 2, slug: 'full', label: 'Full' },
  { value: 3, slug: 'full-color', label: 'Full Color' },
  { value: 4, slug: 'full-max', label: 'Full Max' },
  { value: 5, slug: 'full-medium', label: 'Full Medium' },
  { value: 6, slug: 'goatee', label: 'Goatee' },
  { value: 7, slug: 'goatee-full', label: 'Goatee Full' },
  { value: 8, slug: 'mustache-bull', label: 'Bull Stache' },
  { value: 9, slug: 'mustache-eight', label: 'Stache 8' },
  { value: 10, slug: 'mustache-five', label: 'Stache 5' },
  { value: 11, slug: 'mustache-nine', label: 'Stache 9' },
  { value: 12, slug: 'mustache-seven', label: 'Stache 7' },
  { value: 13, slug: 'mustache-six', label: 'Stache 6' },
  { value: 14, slug: 'mustache-thin', label: 'Thin Stache' },
  { value: 15, slug: 'mustache-thin-bull', label: 'Thin Bull' },
  { value: 16, slug: 'mustache-yosemite', label: 'Yosemite' },
]

export const accessoryOptions: AvatarOption[] = [
  { value: 0, slug: '', label: 'None' },
  { value: 1, slug: 'eyepatch', label: 'Eyepatch' },
  { value: 2, slug: 'glasses', label: 'Glasses' },
  { value: 3, slug: 'glasses-five', label: 'Glasses 5' },
  { value: 4, slug: 'glasses-four', label: 'Glasses 4' },
  { value: 5, slug: 'glasses-six', label: 'Glasses 6' },
  { value: 6, slug: 'glasses-three', label: 'Glasses 3' },
  { value: 7, slug: 'glasses-two', label: 'Glasses 2' },
  { value: 8, slug: 'sunglasses', label: 'Sunglasses' },
  { value: 9, slug: 'sunglasses-two', label: 'Sunglasses 2' },
]

// ── Category -> API path mapping ─────────────────────────────

export type PartCategory = 'head' | 'face' | 'body' | 'facial-hair' | 'accessories'

export function partUrl(baseUrl: string, category: PartCategory, slug: string, colors?: Record<string, string>): string {
  const params = colors ? '?' + new URLSearchParams(colors).toString() : ''
  return `${baseUrl}/v1/parts/${category}/${slug}.svg${params}`
}

// ── Color presets ────────────────────────────────────────────

export const skinPresets = [
  '#FDEBD0', '#FDE4C0', '#FDDCB1', '#EDB98A', '#D4A574',
  '#D08B5B', '#C68642', '#AE5D29', '#8D5524', '#614335',
]

export const hairPresets = [
  '#090806', '#2C222B', '#3B3024', '#4E3621', '#71635A',
  '#B7A69E', '#D6C4C2', '#CABFB1', '#DCD0BA', '#FFF5E1',
  '#A55728', '#B55239', '#8D4A43', '#91553D', '#533D32',
  '#E6CEA8', '#E5C8A8', '#DEBC99', '#CB6158', '#B55239',
  '#FF6B6B', '#845EC2', '#4B89DC', '#2ECC71', '#FF69B4',
]

export const clothingPresets = [
  '#FFFFFF', '#F5F5F5', '#E0E0E0', '#9E9E9E', '#424242',
  '#212121', '#000000', '#FFCF77', '#FF6B6B', '#FF0066',
  '#E91E63', '#9C27B0', '#845EC2', '#3F51B5', '#4B89DC',
  '#2196F3', '#00BCD4', '#009688', '#2ECC71', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722',
]

export const backgroundPresets = [
  '#FFCDD2', '#C8E6C9', '#BBDEFB', '#D1C4E9', '#FFE0B2',
  '#FF6B6B', '#FF1744', '#FF4081', '#E91E63', '#FF9800',
  '#FFC107', '#FFEB3B', '#4CAF50', '#00BCD4', '#2196F3',
  '#4B89DC', '#3F51B5', '#845EC2', '#9C27B0', '#000000',
]

// ── Protobuf encoder (no dependencies) ──────────────────────

function encodeVarint(value: number): number[] {
  const bytes: number[] = []
  let v = value >>> 0
  while (v > 0x7f) {
    bytes.push((v & 0x7f) | 0x80)
    v >>>= 7
  }
  bytes.push(v)
  return bytes
}

function encodeIntField(fieldNumber: number, value: number): number[] {
  if (value === 0) return []
  return [...encodeVarint((fieldNumber << 3) | 0), ...encodeVarint(value)]
}

function encodeStringField(fieldNumber: number, value: string | undefined): number[] {
  if (!value) return []
  const encoded = new TextEncoder().encode(value)
  return [
    ...encodeVarint((fieldNumber << 3) | 2),
    ...encodeVarint(encoded.length),
    ...Array.from(encoded),
  ]
}

export function encodeAvatarToken(config: AvatarConfig): string {
  const bytes = [
    ...encodeIntField(1, config.head),
    ...encodeIntField(2, config.body),
    ...encodeIntField(3, config.face),
    ...encodeIntField(4, config.facialHair),
    ...encodeIntField(5, config.accessory),
    ...encodeStringField(10, config.skinColor),
    ...encodeStringField(12, config.topColor),
    ...encodeStringField(13, config.jacketColor),
    ...encodeStringField(14, config.hairColor),
    ...encodeStringField(15, config.hatColor),
    ...encodeStringField(17, config.accessoryColor),
    ...encodeStringField(19, config.backgroundColor),
  ]
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function avatarUrl(config: AvatarConfig, baseUrl: string): string {
  const token = encodeAvatarToken(config)
  return `${baseUrl}/v1/${token}.svg`
}

// ── Randomizer ───────────────────────────────────────────────

function pick<T>(arr: readonly T[]): T {
  if (arr.length === 0) throw new Error('Cannot pick from empty array')
  return arr[Math.floor(Math.random() * arr.length)]!
}

export function randomConfig(): AvatarConfig {
  return {
    head: pick(headOptions).value,
    body: pick(bodyOptions).value,
    face: pick(faceOptions).value,
    facialHair: Math.random() > 0.9 ? pick(facialHairOptions.slice(1)).value : 0,
    accessory: Math.random() > 0.8 ? pick(accessoryOptions.slice(1)).value : 0,
    skinColor: pick(skinPresets),
    hairColor: pick(hairPresets),
    backgroundColor: pick(backgroundPresets),
  }
}
