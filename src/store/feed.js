import { PHOTOS_GET } from '../api';
import createAsyncSlice from './helper/createAsyncSlice';

const slice = createAsyncSlice({
  name: 'feed',
  initialState: {
    list: [],
    pages: 1,
    infinite: true,
  },
  reducers: {
    addPhotos(state, action) {
      state.list.push(...action.payload);
      if (action.payload.length === 0) state.infinite = false;
    },
    addPage(state) {
      state.pages++;
    },
    resetState(state) {
      state.infinite = true;
      state.pages = 1;
      state.list = [];
      state.dats = null;
      state.loading = false;
      state.error = null;
    },
  },
  fetchConfig: ({ page, total, user }) => PHOTOS_GET({ page, total, user }),
});

export const fetchFeed = slice.asyncAction;
export const { addPhotos, addPage, resetState: resetFeedState } = slice.actions;

export const loadNewPhotos =
  ({ total = 6, user }) =>
  async (dispatch, getState) => {
    const { feed } = getState();
    dispatch(addPage());
    const { payload } = await dispatch(
      fetchFeed({ page: feed.page, total, user })
    );
    dispatch(addPhotos(payload));
  };

export default slice.reducer;
