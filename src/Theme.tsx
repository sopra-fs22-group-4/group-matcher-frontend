import { extendTheme, ThemingProps, withDefaultColorScheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: { body: '"DM Sans", sans-serif', heading: '"DM Sans", sans-serif' },
  colors: {
    orange: {
      400: '#ffc87c',
      500: '#FDBC64',
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
      600: '#0024b2',
      700: '#140897'
    },
    green: {
      500: '#10CD45',
      600: '#18b048',
    }
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
      baseStyle: { fontWeight: 700 },
      variants: {
        solid: { rounded: 'full', py: 7, px: 10, boxShadow: 'md' },
        outline: (props: ThemingProps) =>
            ({ rounded: 'full', py: 7, px: 10, borderColor: props.colorScheme+'.500', color: props.colorScheme+'.500' }),
      }
    },
    Input: {
      defaultProps: { focusBorderColor: 'blue.100' },
      variants: {
        outline: {
          field: { rounded: '3xl', h: 12, boxShadow: 'lg', _focus: { boxShadow: 'focus' } },
          addon: { rounded: '3xl' }
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