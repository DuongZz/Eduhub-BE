export interface ZaloOrder {
  app_id: string;
  app_trans_id: string;
  app_user: string;
  app_time: number;
  item: string;
  embed_data: string;
  amount: number;
  callback_url: string;
  description: string;
  bank_code: string;
  mac: string;
}

export interface ZaloCallbackResponse {
  return_code: number;
  return_message: string;
}
