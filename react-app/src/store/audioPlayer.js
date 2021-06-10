const LOAD_CURRENT_TRACK = "LOAD_CURR_TRACK";
const LOAD_TRACKLIST = "LOAD_TRACKLIST";
const UPDATE_PLAY_STATE = "UPDATE_PLAY_STATE";

const updatePlayState = (playState) => ({
  type: UPDATE_PLAY_STATE,
  payload: playState,
});

export const setPlayState = (playState) => (dispatch) => {
  dispatch(updatePlayState(playState));
};

const updateCurrTrack = (index) => ({
  type: LOAD_CURRENT_TRACK,
  payload: index,
});

export const setCurrentTrack = (index) => (dispatch) => {
  const audio = document.querySelector(".audio-player");
  audio.pause();
  dispatch(updateCurrTrack(index));
};

const updateTrackList = (trackList) => ({
  type: LOAD_TRACKLIST,
  payload: trackList,
});

export const setTrackList = (trackList) => (dispatch) => {
  dispatch(updateTrackList(trackList));
};

const initialState = { currentTrack: 0, trackList: [], playState: false };
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_CURRENT_TRACK:
      newState.currentTrack = action.payload;
      newState.playState = false;
      return newState;
    case LOAD_TRACKLIST:
      newState.currentTrack = 0; // reset everything upon new trackList
      newState.playState = false;
      newState.trackList = action.payload;
      return newState;
    case UPDATE_PLAY_STATE:
      newState.playState = action.payload;
      return newState;
    default:
      return state;
  }
}
