import { PHOTO_GET } from '../api';

const FETCH_POTHO_STARTED = 'photo/fetchStarted';
const FETCH_POTHO_SUCCESS = 'photo/fetchSuccess';
const FETCH_POTHO_ERROR = 'photo/fetchError';

const fetchPhotoStarted = () => ({
  type: FETCH_POTHO_STARTED,
});

const fetchPhotoSuccess = (data) => ({
  type: FETCH_POTHO_SUCCESS,
  payload: data,
});

const fetchPhotoError = (error) => ({
  type: FETCH_POTHO_ERROR,
  payload: error,
});

const initialState = {
  loading: false,
  error: null,
  data: null,
};

export default function photo(state = initialState, action) {
  switch (action.type) {
    case FETCH_POTHO_STARTED:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };

    case FETCH_POTHO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case FETCH_POTHO_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const fetchPhoto = (id) => async (dispatch) => {
  try {
    dispatch(fetchPhotoStarted());
    const { url, options } = PHOTO_GET(id);
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === false) throw new Error(data.message);
    dispatch(fetchPhotoSuccess(data));
  } catch (error) {
    dispatch(fetchPhotoError(error.message));
  }
};
