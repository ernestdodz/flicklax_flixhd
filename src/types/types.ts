export enum MovieType {
    MOVIE = 'movie',
    TVSERIES = 'tv-show',
    ALL = 'all',
}

export enum MovieReport {
    TRENDING = 'Trending',
    LATEST_MOVIE = 'Latest Movies',
    LATEST_TV_SHOWS = 'Latest TV Shows',
    COMING_SOON = 'Coming Soon',
}


export enum StreamingServers {
    UpCloud = 'UpCloud',
    VidCloud = 'Vidcloud',
    MixDrop = 'MixDrop',
}


export interface IMovieResult {
    id: string,
    title: string,
    url?: string,
    image?: string,
    releaseDate?: string | null,
    type?: MovieType,
    [x: string]: unknown,
}


export interface ISearch<T> {
    currentPage?: number,
    hasNextPage?: boolean,
    totalPages?: number,
    totalResults?: number,
    results: T[],
}

export interface IMovieEpisode {
    id: string,
    title: string,
    url?: string,
    episode?: number,
    seasons?: number,
    [x: string]: unknown,
}

export interface IMovieInfo extends IMovieResult {
    cover: string,
    description: string,
    episodes: IMovieEpisode[],
    recommended?: IMovieResult[],
    genres?: string[],
    productions?: string[],
    casts?: string[],
    tags?: string[],
    duration?: string,
    rating?: number,
    quality?: string,
}

export interface IEpisodeServer {
    id: string,
    name: string,
    url: string,
}

export interface ISources {
    file: string,
    isM3U8: boolean,
}

export interface ISubtitle {
    url: string,
    label: string,
    kind: string,
    default: boolean
}

export interface IStreamingResult {
    sources: ISources[],
    tracks: ISubtitle[],
}

export interface IMovieSection {
    trendingMovies: IMovieResult[],
    trendingTVShows: IMovieResult[],
    latestMovies: IMovieResult[],
    latestTvShows: IMovieResult[],
    comingSoon: IMovieResult[],
}



