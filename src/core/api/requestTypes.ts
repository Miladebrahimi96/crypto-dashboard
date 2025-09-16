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
  limit: number;
  offset: number;
  page: number;
}
//#endregion

// Coins
export type GetCoinParams = PaginationParams & {};
export type GetCoinRequest = Request<void, GetCoinParams, undefined>;