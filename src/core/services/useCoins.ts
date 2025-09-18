import { client, CoinModel, SingleCoinModel, type GetCoinRequest, type GetCoinDetailRequest, type GetMarketChartRequest } from '@/core/api';
import { MarketChartModel } from '@/core/api/models/marketChart';

export const useCoins = () => {
  // get coins
  const getCoins = async (request: GetCoinRequest): Promise<CoinModel[]> => {
    const response = await client.get('/coins/markets',
      { params: request.params }
    );

    const result = client.toResponse(CoinModel, response.data) as CoinModel[];
    return result;
  };

  // get individual coin details
  const getCoinDetail = async (request: GetCoinDetailRequest): Promise<CoinModel> => {
    const response = await client.get(`/coins/${request.path?.id}`,
      { params: request.params }
    );

    const result = client.toResponse(CoinModel, response.data) as CoinModel;
    return result;
  };

  // get single coin with detailed information
  const getSingleCoin = async (request: GetCoinDetailRequest): Promise<SingleCoinModel> => {
    const response = await client.get(`/coins/${request.path?.id}`,
      { params: request.params }
    );

    const result = client.toResponse(SingleCoinModel, response.data) as SingleCoinModel;
    return result;
  };

  const getMarketChart = async (request: GetMarketChartRequest): Promise<MarketChartModel> => {
    const response = await client.get(`/coins/${request.path?.id}/market_chart`,
      { params: request.params }
    );

    const result = client.toResponse(MarketChartModel, response.data) as MarketChartModel;
    return result;
  };

  return { getCoins, getCoinDetail, getSingleCoin, getMarketChart };
};