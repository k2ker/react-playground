type YoutubeVideoList = {
  kind: string;
  etag: string;
  items: Item[];
  nextPageToken: string;
  pageInfo: PageInfo;
};

type Video = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
};

type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  tags?: string[];
  defaultLanguage?: string;
  defaultAudioLanguage?: string;
};

type Thumbnails = {
  default: Default;
  medium: Medium;
  high: High;
  standard: Standard;
  maxres: Maxres;
};

type Default = {
  url: string;
  width: number;
  height: number;
};

type Medium = {
  url: string;
  width: number;
  height: number;
};

type High = {
  url: string;
  width: number;
  height: number;
};

type Standard = {
  url: string;
  width: number;
  height: number;
};

type Maxres = {
  url: string;
  width: number;
  height: number;
};

type Localized = {
  title: string;
  description: string;
};

type ContentDetails = {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: ContentRating;
  projection: string;
};

type ContentRating = {};

type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};
