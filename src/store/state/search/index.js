import { MAX_RESULTS_PER_REQUEST } from '../../../utils/constants';
import { SET_SEARCH } from './types';

const initialState = {
  search: { query: '', subject: '', orderBy: 'relevance', maxResults: MAX_RESULTS_PER_REQUEST },
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: { ...state.search, ...action.search } };
    default:
      return state;
  }
};
