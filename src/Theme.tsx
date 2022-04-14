import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: { body: '"Manrope", sans-serif', heading: '"DM Sans", sans-serif' },
  components: {
    Button: {
      baseStyle: { rounded: '3xl' }
    },
    Input: {
      variants: {
        outline: {
          field: { rounded: '3xl', w: '2xs' },
          addon: { rounded: '3xl' }
        }
      }
    },
    FormLabel: {
      baseStyle: { fontWeight: 600, color: 'blue.700', mx: 3, my: 1 }
    },
    FormError: {
      baseStyle: {
        text: { position: 'absolute', right: 0, bottom: -5 }
      }
    }
  }
})

export { theme }