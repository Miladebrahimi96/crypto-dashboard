export class MarketChartModel {
  prices!: [number, number][];
  marketCaps!: [number, number][];
  totalVolumes!: [number, number][];

  constructor(data: Partial<MarketChartModel>) {
    Object.assign(this, data);
  }

  getChartData() {
    return this.prices.map(([timestamp, price], index) => ({
      timestamp,
      date: new Date(timestamp).toLocaleDateString(),
      time: new Date(timestamp).toLocaleTimeString(),
      price,
      marketCap: this.marketCaps[index]?.[1] || 0,
      volume: this.totalVolumes[index]?.[1] || 0,
    }));
  }

  getPriceChangePercentage(): number {
    if (this.prices.length < 2) return 0;

    const firstPrice = this.prices[0][1];
    const lastPrice = this.prices[this.prices.length - 1][1];

    return ((lastPrice - firstPrice) / firstPrice) * 100;
  }

  getPriceRange() {
    const prices = this.prices.map(([, price]) => price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }
}
