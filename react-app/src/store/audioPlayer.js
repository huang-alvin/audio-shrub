const initialState = { currentTrack: 0, trackList: null };
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_USER_MERCH:
      for (let merchPost in action.payload) {
        newState[merchPost.id] = merchPost;
      }
      return newState;
    case UPLOAD_MERCH:
      newState[action.merchPost.id] = action.merchPost;
      return newState;
    default:
      return state;
  }
}
