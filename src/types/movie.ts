export interface Movie {
  categoryId: number,
  description: string,
  id: string,
  imageUrl: string,
  imdbId: string,
  name: string
}

export interface MovieComment {
  createdAt: string,
  text: string,
  id: string,
  movieId: string,
  comment: string,
  MovieImdbId?: string
  UserId?: string,
  Username?: string,
  IsAnon?: boolean,
  Comment?: string
}

export interface MovieWithCommentsAndVideoId extends Movie {
  comments: MovieComment[] | null,
  //videoId: string
}
