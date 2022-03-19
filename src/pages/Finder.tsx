import { SlideFade, Tag, Wrap } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { CachePolicies, useFetch } from 'use-http'

export default function Finder() {
  const { partialName } = useParams()
  const matcher = useFetch(`/matchers/${partialName}`, { data: {}, cachePolicy: CachePolicies.NO_CACHE }, []).data

  return (
      <SlideFade in offsetY='20px'>
        <Wrap gap={2}>
          <Tag>{`Matcher ID: ${matcher?.id || 'None'}`}</Tag>
          <Tag colorScheme='purple'>{`Matcher Name: ${matcher?.name || 'Default'}`}</Tag>
        </Wrap>
      </SlideFade>
  )


}
