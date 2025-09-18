// Interfaces for nested objects
export interface Platform {
  decimal_place?: number | null;
  contract_address?: string;
}

export interface Platforms {
  [key: string]: string;
}

export interface DetailPlatforms {
  [key: string]: Platform;
}

export interface Localization {
  [key: string]: string;
}

export interface Description {
  [key: string]: string;
}

export interface Links {
  homepage?: string[];
  whitepaper?: string;
  blockchainSite?: string[];
  officialForumUrl?: string[];
  chatUrl?: string[];
  announcementUrl?: string[];
  snapshotUrl?: string | null;
  twitterScreenName?: string;
  facebookUsername?: string;
  bitcointalkThreadIdentifier?: number | null;
  telegramChannelIdentifier?: string;
  subredditUrl?: string;
  reposUrl?: {
    github?: string[];
    bitbucket?: string[];
  };
}

export interface Image {
  thumb?: string;
  small?: string;
  large?: string;
}

export interface CurrentPrice {
  [currency: string]: number;
}

export interface Ath {
  [currency: string]: number;
}

export interface AthChangePercentage {
  [currency: string]: number;
}

export interface MarketData {
  currentPrice?: CurrentPrice;
  totalValueLocked?: number | null;
  mcapToTvlRatio?: number | null;
  fdvToTvlRatio?: number | null;
  roi?: number | null;
  ath?: Ath;
  athChangePercentage?: AthChangePercentage;
  athDate?: { [currency: string]: string };
  atl?: { [currency: string]: number };
  atlChangePercentage?: { [currency: string]: number };
  atlDate?: { [currency: string]: string };
  marketCap?: { [currency: string]: number };
  marketCapRank?: number;
  fullyDilutedValuation?: { [currency: string]: number };
  totalVolume?: { [currency: string]: number };
  high24h?: { [currency: string]: number };
  low24h?: { [currency: string]: number };
  priceChange24h?: number;
  priceChangePercentage24h?: number;
  priceChangePercentage7d?: number;
  priceChangePercentage14d?: number;
  priceChangePercentage30d?: number;
  priceChangePercentage60d?: number;
  priceChangePercentage200d?: number;
  priceChangePercentage1y?: number;
  marketCapChange24h?: number;
  marketCapChangePercentage24h?: number;
  priceChange24hInCurrency?: { [currency: string]: number };
  priceChangePercentage1hInCurrency?: { [currency: string]: number };
  priceChangePercentage24hInCurrency?: { [currency: string]: number };
  priceChangePercentage7dInCurrency?: { [currency: string]: number };
  priceChangePercentage14dInCurrency?: { [currency: string]: number };
  priceChangePercentage30dInCurrency?: { [currency: string]: number };
  priceChangePercentage60dInCurrency?: { [currency: string]: number };
  priceChangePercentage200dInCurrency?: { [currency: string]: number };
  priceChangePercentage1yInCurrency?: { [currency: string]: number };
  marketCapChange24hInCurrency?: { [currency: string]: number };
  marketCapChangePercentage24hInCurrency?: { [currency: string]: number };
  totalSupply?: number;
  maxSupply?: number;
  circulatingSupply?: number;
  lastUpdated?: string;
}

export interface SingleCoinData {
  id: string;
  symbol: string;
  name: string;
  webSlug?: string;
  assetPlatformId?: string | null;
  platforms?: Platforms;
  detailPlatforms?: DetailPlatforms;
  blockTimeInMinutes?: number;
  hashingAlgorithm?: string;
  categories?: string[];
  previewListing?: boolean;
  publicNotice?: string | null;
  additionalNotices?: string[];
  localization?: Localization;
  description?: Description;
  links?: Links;
  image?: Image;
  countryOrigin?: string;
  genesisDate?: string;
  sentimentVotesUpPercentage?: number;
  sentimentVotesDownPercentage?: number;
  watchlistPortfolioUsers?: number;
  marketCapRank?: number;
  marketData?: MarketData;
}

export class SingleCoinModel {
  public id: string;
  public symbol: string;
  public name: string;
  public webSlug?: string;
  public assetPlatformId?: string | null;
  public platforms?: Platforms;
  public detailPlatforms?: DetailPlatforms;
  public blockTimeInMinutes?: number;
  public hashingAlgorithm?: string;
  public categories?: string[];
  public previewListing?: boolean;
  public publicNotice?: string | null;
  public additionalNotices?: string[];
  public localization?: Localization;
  public description?: Description;
  public links?: Links;
  public image?: Image;
  public countryOrigin?: string;
  public genesisDate?: string;
  public sentimentVotesUpPercentage?: number;
  public sentimentVotesDownPercentage?: number;
  public watchlistPortfolioUsers?: number;
  public marketCapRank?: number;
  public marketData?: MarketData;

  constructor(data: SingleCoinData) {
    this.id = data.id;
    this.symbol = data.symbol;
    this.name = data.name;
    this.webSlug = data.webSlug;
    this.assetPlatformId = data.assetPlatformId;
    this.platforms = data.platforms;
    this.detailPlatforms = data.detailPlatforms;
    this.blockTimeInMinutes = data.blockTimeInMinutes;
    this.hashingAlgorithm = data.hashingAlgorithm;
    this.categories = data.categories;
    this.previewListing = data.previewListing;
    this.publicNotice = data.publicNotice;
    this.additionalNotices = data.additionalNotices;
    this.localization = data.localization;
    this.description = data.description;
    this.links = data.links;
    this.image = data.image;
    this.countryOrigin = data.countryOrigin;
    this.genesisDate = data.genesisDate;
    this.sentimentVotesUpPercentage = data.sentimentVotesUpPercentage;
    this.sentimentVotesDownPercentage = data.sentimentVotesDownPercentage;
    this.watchlistPortfolioUsers = data.watchlistPortfolioUsers;
    this.marketCapRank = data.marketCapRank;
    this.marketData = data.marketData;
  }

  // Helper methods for formatted display
  public getFormattedPrice(currency: string = 'usd'): string {
    const price = this.marketData?.currentPrice?.[currency] || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(price);
  }

  public getFormattedMarketCap(currency: string = 'usd'): string {
    const marketCap = this.marketData?.marketCap?.[currency] || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(marketCap);
  }

  public getFormattedVolume(currency: string = 'usd'): string {
    const volume = this.marketData?.totalVolume?.[currency] || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(volume);
  }

  public getFormattedSupply(): string {
    const supply = this.marketData?.circulatingSupply || 0;
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(supply);
  }

  public getFormattedMaxSupply(): string {
    const maxSupply = this.marketData?.maxSupply || 0;
    if (maxSupply === 0) return 'No limit';
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(maxSupply);
  }

  public getPriceChangePercentage24h(): number {
    return this.marketData?.priceChangePercentage24h || 0;
  }

  public getPriceChangePercentage7d(): number {
    return this.marketData?.priceChangePercentage7d || 0;
  }

  public getPriceChangePercentage30d(): number {
    return this.marketData?.priceChangePercentage30d || 0;
  }

  public getPriceChangePercentage1y(): number {
    return this.marketData?.priceChangePercentage1y || 0;
  }

  public getAthPrice(currency: string = 'usd'): number {
    return this.marketData?.ath?.[currency] || 0;
  }

  public getAthChangePercentage(currency: string = 'usd'): number {
    return this.marketData?.athChangePercentage?.[currency] || 0;
  }

  public getAtlPrice(currency: string = 'usd'): number {
    return this.marketData?.atl?.[currency] || 0;
  }

  public getAtlChangePercentage(currency: string = 'usd'): number {
    return this.marketData?.atlChangePercentage?.[currency] || 0;
  }

  public getImageUrl(size: 'thumb' | 'small' | 'large' = 'large'): string {
    return this.image?.[size] || '';
  }

  public getDescription(language: string = 'en'): string {
    return this.description?.[language] || '';
  }

  public getLocalizedName(language: string = 'en'): string {
    return this.localization?.[language] || this.name;
  }

  public getCategories(): string[] {
    return this.categories || [];
  }

  public getHomepageUrl(): string {
    return this.links?.homepage?.[0] || '';
  }

  public getWhitepaperUrl(): string {
    return this.links?.whitepaper || '';
  }

  public getTwitterUrl(): string {
    const username = this.links?.twitterScreenName;
    return username ? `https://twitter.com/${username}` : '';
  }

  public getRedditUrl(): string {
    return this.links?.subredditUrl || '';
  }

  public getGithubUrl(): string {
    return this.links?.reposUrl?.github?.[0] || '';
  }

  public getBlockTimeInMinutes(): number {
    return this.blockTimeInMinutes || 0;
  }

  public getHashingAlgorithm(): string {
    return this.hashingAlgorithm || '';
  }

  public getGenesisDate(): string {
    return this.genesisDate || '';
  }

  public getSentimentUpPercentage(): number {
    return this.sentimentVotesUpPercentage || 0;
  }

  public getSentimentDownPercentage(): number {
    return this.sentimentVotesDownPercentage || 0;
  }

  public getWatchlistUsers(): number {
    return this.watchlistPortfolioUsers || 0;
  }

  public getMarketCapRank(): number {
    return this.marketCapRank || 0;
  }
}
