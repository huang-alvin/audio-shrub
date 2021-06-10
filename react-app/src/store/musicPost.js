const UPLOAD_MUSIC = "UPLOAD_MUSIC";
const LOAD_USER_MUSIC = "LOAD_MUSIC";

export const fetchUserMusicPosts = (userId) => async () => {
  const res = await fetch(`/api/music-post/users/${userId}`);
  let result = await res.json();
  return result.musicPosts;
};
export const fetchSingleMusicPost = (musicPostId) => async () => {
  const res = await fetch(`/api/music-post/${musicPostId}`);
  let result = await res.json();
  return result.musicPost;
};
const uploadMusicPost = (musicPost) => ({
  type: UPLOAD_MUSIC,
  musicPost,
});

export const uploadMusic = (form) => async (dispatch) => {
  // by removing header, the boundary will be set correctly(automatic).
  const res = await fetch("/api/upload/music", {
    method: "POST",
    body: form,
  });
  const musicPost = await res.json();
  if (musicPost.errors) {
    return musicPost;
  }
  // console.log(musicPost); check for errors
  //   dispatch(uploadMusicPost(musicPost));
};

const loadUserMusic = (musicPosts) => ({
  type: LOAD_USER_MUSIC,
  payload: musicPosts,
});

export const loadMusic = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/music`);
  const musicPosts = await res.json();
  dispatch(loadUserMusic(musicPosts));
};

const initialState = {};
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_USER_MUSIC:
      for (let musicPost in action.payload) {
        newState[musicPost.id] = musicPost;
      }
      return newState;
    case UPLOAD_MUSIC:
      newState[action.musicPost.id] = action.musicPost;
      return newState;
    default:
      return state;
  }
}
