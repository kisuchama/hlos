const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      red: colors.red,
      gold: colors.amber,  
      south: '#e93417',
      akira: '#cc0000',
      will: '#ffc436',
      brad: '#3f2569',
      oscar: '#46c1d0',
      north: '#1867ff',
      ren: '#12459e',
      gast: '#4d791c',
      victor: '#c6bfb9',
      marion: '#9d0039',
      west: '#ffba31',
      junior: '#e7da36',
      faith: '#da38b8',
      keith: '#a1ca2e',
      dino: '#f58ea3',
      east: '#61ac0a',
      gray: '#19727a',
      billy: '#ff7608',
      asch: '#8897ac',
      jay: '#ceb300',
      nova: '#031417',
      lily: '#ffe373',
      jack02: '#8c8991',
      jacqueline: '#ff9eb3',
      siams: '#830707',
      shin: '#830707',
      sirius: '#830707',
    },
    fontFamily: {
      'display': ['"Krona One"']
    },
    extend: {
      fontFamily: {
        'sans': [
          'Rubik',
          '"Noto Sans JP"',
          ...defaultTheme.fontFamily.sans,
        ]
      }
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: /text-(xs|xl|2xl|3xl|4xl|5xl|6xl)/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    'mb-16',
    'mb-4',
    'my-8',
    'text-slate-400',
    'bg-slate-300',
    'list-disc',
    'list-inside',
    'font-display',
    '2xl:grid-cols-3',
    'gap-8',
    'gap-2',
    'gap-x-2',
    'lg:gap-y-8',
    '2xl:gap-4',
    'lg:top-8',
    'md:gap-y-8',
    'gap-2',
    'ml-8',
    'pr-4',
    'py-1',
    'px-3',
    '-mt-2',
    '2xl:mt-4',
    'border-[1px]',
    'border-black',
    'h-[3px]',
    'space-x-2.5',
    {
      pattern: /(grid-cols|col-span)-(2|3|4|6|9|12)/,
      variants: ['md', 'lg', 'xl'],
    },
    {
      pattern: /mb-(8|12)/
    },
    {
      pattern: /(hidden|block)/,
      variants: ['lg', 'xl', '2xl'],
    },
    {
      pattern: /divide-(y|solid|slate-300)/
    },
    {
      pattern: /z-(0|10|20)/,
      variants: 'before',
    },
    {
      pattern: /(bg|text|border)-(south|akira|will|brad|oscar|north|ren|gast|victor|marion|west|junior|faith|keith|dino|east|gray|billy|asch|jay|nova|lily|jack02|jacqueline|siams|shin|sirius)/,
      variants: ['before', 'hover', 'active', 'focus'],
    },
  ],
}
