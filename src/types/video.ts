export interface Video {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: PageInfo
  items: Item[]
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface Item {
  kind: string
  etag: string
  id: Id
}

export interface Id {
  kind: string
  videoId: string
}
