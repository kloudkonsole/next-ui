import { query } from '@/services/sku';

export default {
  namespace: 'sku',
  state: {},
  effects: {
    *list(_, { call, put }) {
      const {body} = yield call(query);
      yield put({
        type: 'save',
        body
      });
    },
  },
  reducers: {
    save(state, {body}) {
      return {...state, ...body.reduce((acc, sku) => {
		  acc[sku.i] = sku
		  return acc
      }, {})}
    },
  },
};