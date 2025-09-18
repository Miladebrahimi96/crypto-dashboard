import type { ID } from "./models";

//#region Default requests
export interface Request<D, P, I> {
  data?: D;
  params?: P;
  path?: I;
}

export type PathRequest = {
  id: ID;
}

export type PaginationParams = {
  limit?: number;
  offset?: number;
  page?: number;
}
//#endregion

// Coins
export type GetCoinParams = PaginationParams & {
  vsCurrency?: string;
  order?: string;
  perPage?: number;
  parkline?: boolean;
};
export type GetCoinRequest = Request<void, GetCoinParams, undefined>;

export type GetCoinDetailParams = {
  vsCurrency?: string;
  includeMarketCap?: boolean;
  include24hrVol?: boolean;
  include24hrChange?: boolean;
  includeLastUpdatedAt?: boolean;
};
export type GetCoinDetailRequest = Request<void, GetCoinDetailParams, PathRequest>;

export type GetMarketChartParams = {
  vsCurrency?: string;
  days?: number;
  interval?: string;
};
export type GetMarketChartRequest = Request<void, GetMarketChartParams, PathRequest>;