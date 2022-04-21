import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: { body: '"DM Sans", sans-serif', heading: '"DM Sans", sans-serif' },
  colors: {
    gray: {
      200: '#EFF0F7',
      500: '#A0A3BD',
      600: '#6F6C90',
      800: '#170F49'
    },
    purple: {
      50: '#f4f4ff',
      100: '#dcdcff',
      500: '#4A3AFF',
      600: '#0024b2',
      700: '#140897'
    }
  },
  shadows: {
    md: '0px 3px 12px rgba(74, 58, 255, 0.18)',
    lg: '0px 2px 6px rgba(19, 18, 66, 0.07)',
    outline: '0 0 0 3px #696cff36'
  },
  components: {
    Button: {
      baseStyle: { rounded: 'full', p: 7, fontWeight: 700 },
      variants: {
        solid: { px: 10, boxShadow: 'md' },
        outline: { borderColor: 'purple.500', color: 'purple.500', bg: 'white' }
      }
    },
    Input: {
      variants: {
        outline: {
          field: { rounded: '3xl', h: 12, boxShadow: 'lg' },
          addon: { rounded: '3xl' }
        }
      }
    },
    FormLabel: {
      baseStyle: { fontWeight: 500, m: 3, textTransform: 'capitalize' }
    },
    FormError: {
      baseStyle: {
        text: { position: 'absolute', right: 0, bottom: -5 }
      }
    }
  }
}, withDefaultColorScheme({ colorScheme: 'purple' }))

export { theme }