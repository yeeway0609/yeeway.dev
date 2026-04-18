export const SITE = {
  url: 'https://yeeway.dev',
  title: 'yeeway.dev',
  description: 'Website of Alex Su, Full Stack Developer.',
  ogImage: 'https://yeeway.dev/og.png',
  logo: 'https://yeeway.dev/logo.png',
} as const

export const CONTACTS = {
  email: 'hi@yeeway.dev',
  github: 'https://github.com/yeeway0609',
  linkedin: 'https://www.linkedin.com/in/yi-wei-su',
  instagram: 'https://www.instagram.com/yeeway_0609/',
  spotify: 'https://open.spotify.com/user/316mp4peyke2yfbklasiigreqyfq?si=d355fe49436e4a4d',
  discord: 'https://discordapp.com/users/388961699488595968',
} as const

export const DEFAULT_COVER_IMAGE = `/cover.png`

export const BLOG_DIR = 'content/blog'

export const RATING_OPTIONS = [
  { label: '❤️', value: '6' },
  { label: '⭐️⭐️⭐️⭐️⭐️', value: '5' },
  { label: '⭐️⭐️⭐️⭐️', value: '4' },
  { label: '⭐️⭐️⭐️', value: '3' },
  { label: '⭐️⭐️', value: '2' },
  { label: '⭐️', value: '1' },
] as const

export const LIBRARY_TYPES = [
  {
    value: 'tv',
    label: 'TV',
  },
  {
    value: 'movie',
    label: 'Movie',
  },
  // {
  //   value: 'book',
  //   label: 'Book',
  // },
  // {
  //   value: 'comic',
  //   label: 'Comic',
  // },
  // {
  //   value: 'game',
  //   label: 'Game',
  // },
] as const
