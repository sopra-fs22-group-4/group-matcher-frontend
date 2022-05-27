import { extendTheme, ThemingProps, withDefaultColorScheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: { body: '"DM Sans", sans-serif', heading: '"DM Sans", sans-serif' },
  colors: {
    orange: {
      400: '#ffc87c',
      500: '#FDBC64',
      520: '#8c510063',
      600: '#efa846'
    },
    gray: {
      100: '#F6F6F6',
      200: '#EFF0F7',
      300: '#E6E6E6',
      400: '#999999',
      500: '#A0A3BD',
      600: '#6F6C90',
      800: '#170F49'
    },
    blue: {
      50: '#f4f4ff',
      100: '#dcdcff',
      500: '#4A3AFF',
      520: '#92bef9',
      600: '#0024b2',
      700: '#140897'
    },
    green: {
      500: '#10CD45',
      600: '#18b048',
      700: '#00a531'
    },
    purple: {
      70: '#ecd5f7',
      150: '#E1E1FB',
      250: '#DEDBFF',
      400: '#a747ff',
      500: '#9D31D0',
      520: '#a219e2',
      600: '#861cb8'
    },
  },
  shadows: {
    md: '0px 3px 12px rgba(74, 58, 255, 0.18)',
    lg: '0px 2px 6px rgba(19, 18, 66, 0.07)',
    focus: '0px 2px 6px rgba(19, 18, 66, 0.07), 0px 0px 0px 1px #dcdcff',
    outline: '0 0 0 3px #696cff36',
    hover: '0 30px 30px -25px #030407ba'
  },
  components: {
    Button: {
      variants: {
        solid: { boxShadow: 'lg' },
        outline: { boxShadow: 'lg' },
        round: {
          rounded: 'full', py: 7, px: 10, boxShadow: 'md', fontWeight: 700,
          bg: 'blue.500', color: 'white', _hover: { bg: 'blue.600', _disabled: { bg: 'blue.500' } }
        },
        'round-outline': {
            rounded: 'full', py: 7, px: 10, boxShadow: 'md', fontWeight: 700, borderWidth: 1,
            bg: 'white', borderColor: 'blue.500', color: 'blue.500', _hover: { bg: 'blue.50' }
          },
        dashed: {
          minH: '20vh', h: 'full', rounded: '2xl', border: '2px dashed', borderColor: 'gray.400',
          flexDir: 'column', gap: 3, color: 'purple.600', _hover: { bg: 'purple.50' }
        },
        hover: (props: ThemingProps) => ({
          p: 5, minH: '20vh', h: 'fit-content', w: 'xs', rounded: '2xl', color: 'white', position: 'relative',
          overflow: 'hidden', bg: `${props.colorScheme}.500`, boxShadow: 'hover',
          _hover: { transform: 'translateY(-0.5rem)' }, _focus: { bg: `${props.colorScheme}.500`, boxShadow: 'hover' }
        }),
        card: {
          rounded: 'xl', h: 'fit-content', borderWidth: 2, p: 3, boxShadow: 'lg', w: 'full', flexDir: 'column',
          alignItems: 'start', textAlign: 'start', whiteSpace: 'wrap', bg: 'white', borderColor: 'gray.200',
          cursor: 'pointer', _hover: { bg: 'gray.50' }, _checked: { bg: 'gray.50', borderColor: 'blue.500' },
          _active: { bg: 'gray.50', borderColor: 'blue.500', color: 'blue.500' }
        }
      }
    },
    Input: {
      defaultProps: { focusBorderColor: 'blue.100' },
      variants: {
        outline: {
          field: { rounded: '3xl', h: 12, boxShadow: 'lg', _focus: { boxShadow: 'focus' } },
          addon: { rounded: '3xl' }
        },
        filled: {
          field: { h: 6, maxW: '10rem', textAlignLast: 'center', p: 0 }
        }
      }
    },
    FormLabel: {
      baseStyle: { fontWeight: 500, m: 1, textTransform: 'capitalize' }
    },
    FormError: {
      baseStyle: {
        text: { position: 'absolute', right: 0, bottom: -5 }
      }
    }
  }
}, withDefaultColorScheme({ colorScheme: 'blue' }))

export { theme }