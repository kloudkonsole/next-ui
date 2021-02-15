import request from '@/utils/request';

export async function query() {
  return request('/1.0/sku');
}