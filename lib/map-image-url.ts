import { Block } from 'notion-types'
import { defaultMapImageUrl } from 'react-notion-x'

import { defaultPageCover, defaultPageIcon } from './config'

export const mapImageUrl = (url: string | null | undefined, block: Block): string | null => {
  if (!url) {
    return null
  }

  if (url === defaultPageCover || url === defaultPageIcon) {
    return url
  }

  return defaultMapImageUrl(url, block)
}
