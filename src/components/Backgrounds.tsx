import { createIcon, IconProps } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const BackgroundIllustration = createIcon({
  path: (
      <g>
        <path
            d="M 328.511 -514.289 L -287.489 101.711 L 859.511 1248.711 L 1186.511 921.711 L 701.511 436.711 L -55.989 1194.211 L -314.489 935.711 L 1062.511 -441.289 L 817.011 -686.789 L 378.011 -247.789 L 1007.511 381.711 L 313.011 1076.211 L -197.489 565.711 L 632.511 -264.289 L 358.011 -538.789 L 328.511 -514.289 Z"
            fill="none" stroke="#4A3AFF" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round"/>
        <path
            d="M 496.846 -114.023 C 505.091 -114.023 511.776 -120.708 511.776 -128.954 C 511.776 -137.199 505.091 -143.884 496.846 -143.884 C 488.6 -143.884 481.916 -137.199 481.916 -128.954 C 481.916 -120.708 488.6 -114.023 496.846 -114.023 Z"
            fill="#FFD66D" fillOpacity="0.4"/>
      </g>
  )
})

export function LineBackground(props: IconProps) {
  return (
      <Box boxSize='full' position='absolute' overflow='clip' zIndex={-1} right={0} bottom={0}>
        <BackgroundIllustration boxSize='100vw' viewBox='0 0 1500 500' {...props} />
      </Box>
  )
}