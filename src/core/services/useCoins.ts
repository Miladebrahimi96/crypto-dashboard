import { client, type GetCoinRequest } from '@/core/api';

export const useCoins = () => {
  // get coins
  const getCoins = async (request: GetCoinRequest) => {
    const response = await client.get('/coins',
      { params: request.params }
    );
    return response;
  };

  return { getCoins };
};