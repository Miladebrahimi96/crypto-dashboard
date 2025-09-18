export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  fullyDilutedValuation: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCapChange24h: number;
  marketCapChangePercentage24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply?: number;
  ath: number;
  athChangePercentage: number;
  athDate: string;
  atl: number;
  atlChangePercentage: number;
  atlDate: string;
  roi: number | null;
  lastUpdated: string;
}

export class CoinModel {
  public id?: string | number | null;
  public symbol?: string;
  public name?: string;
  public image?: string;
  public currentPrice?: number;
  public marketCap?: number;
  public marketCapRank?: number;
  public fullyDilutedValuation?: number;
  public totalVolume?: number;
  public high24h?: number;
  public low24h?: number;
  public priceChange24h?: number;
  public priceChangePercentage24h?: number;
  public marketCapChange24h?: number;
  public marketCapChangePercentage24h?: number;
  public circulatingSupply?: number;
  public totalSupply?: number;
  public maxSupply?: number;
  public ath?: number;
  public athChangePercentage?: number;
  public athDate?: string;
  public atl?: number;
  public atlChangePercentage?: number;
  public atlDate?: string;
  public roi?: number | null;
  public lastUpdated?: string;

  constructor(data: CoinData) {
    this.id = data?.id;
    this.symbol = data?.symbol;
    this.name = data?.name;
    this.image = data?.image;
    this.currentPrice = data?.currentPrice;
    this.marketCap = data?.marketCap;
    this.marketCapRank = data?.marketCapRank;
    this.fullyDilutedValuation = data?.fullyDilutedValuation;
    this.totalVolume = data?.totalVolume;
    this.high24h = data?.high24h;
    this.low24h = data?.low24h;
    this.priceChange24h = data?.priceChange24h;
    this.priceChangePercentage24h = data?.priceChangePercentage24h;
    this.marketCapChange24h = data?.marketCapChange24h;
    this.marketCapChangePercentage24h = data?.marketCapChangePercentage24h;
    this.circulatingSupply = data?.circulatingSupply;
    this.totalSupply = data?.totalSupply;
    this.maxSupply = data?.maxSupply;
    this.ath = data?.ath;
    this.athChangePercentage = data?.athChangePercentage;
    this.athDate = data?.athDate;
    this.atl = data?.atl;
    this.atlChangePercentage = data?.atlChangePercentage;
    this.atlDate = data?.atlDate;
    this.roi = data?.roi;
    this.lastUpdated = data?.lastUpdated;
  }

  // Helper methods for formatted display
  public getFormattedPrice(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.currentPrice || 0);
  }
}