import { queryFakeEpisodeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';

export default {
  namespace: 'episodes',

  state: {
    episodes: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeEpisodeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeEpisodeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        episodes: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        episodes: state.episodes.concat(action.payload),
      };
    },
  },
};
