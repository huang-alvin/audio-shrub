const LOAD_VIEW_USER_PROFILE = "LOAD_VIEW_USER_PROFILE";

const loadViewUserProfile = (profile) => ({
  type: LOAD_VIEW_USER_PROFILE,
  payload: profile,
});

export const fetchUserInfo = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/view`);
  let result = await res.json();
  dispatch(loadViewUserProfile(result));
};

const initialState = { profile: null, music: null, merch: null };
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_VIEW_USER_PROFILE:
      newState.profile = action.payload.user;
      return newState;
    default:
      return state;
  }
}
