const LOAD_VIEW_USER_PROFILE = "LOAD_VIEW_USER_PROFILE";
const CLEAR_VIEW_USER_PROFILE = "CLEAR_VIEW_USER_PROFILE";

const loadViewUserProfile = (profile) => ({
  type: LOAD_VIEW_USER_PROFILE,
  payload: profile,
});

const clearViewUserProfile = () => ({
  type: CLEAR_VIEW_USER_PROFILE,
});

export const clearProfile = () => (dispatch) => {
  dispatch(clearViewUserProfile());
};

export const fetchUserInfo = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/view`);
  let result = await res.json();
  dispatch(loadViewUserProfile(result));
};

const initialState = { music_posts: [], merch_posts: [] };
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_VIEW_USER_PROFILE:
      newState = { ...action.payload.user };
      return newState;
    case CLEAR_VIEW_USER_PROFILE:
      newState = initialState;
      return newState;
    default:
      return state;
  }
}
