const UPLOAD_MERCH = "UPLOAD_MERCH";
const LOAD_USER_MERCH = "LOAD_MERCH";

export const fetchUserMerchPosts = (userId) => async () => {
  const res = await fetch(`/api/merch-post/users/${userId}`);
  let result = await res.json();
  return result.merchPosts;
};
export const fetchSingleMerchPost = (merchPostId) => async () => {
  const res = await fetch(`/api/merch-post/${merchPostId}`);
  let result = await res.json();
  return result.merchPost;
};
const uploadMerchPost = (merchPost) => ({
  type: UPLOAD_MERCH,
  merchPost,
});

export const uploadMerch = (form) => async (dispatch) => {
  const res = await fetch("/api/upload/merch", {
    method: "POST",
    body: form,
  });

  const merchPost = await res.json();
  dispatch(uploadMerchPost(merchPost));
  return merchPost;
};

const loadUserMerch = (merchPosts) => ({
  type: LOAD_USER_MERCH,
  payload: merchPosts,
});

export const loadMerch = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/merch`);
  const merchPosts = await res.json();
  dispatch(loadUserMerch(merchPosts));
};

const initialState = [];
export default function reducer(state = initialState, action) {
  let newState = [...state];
  switch (action.type) {
    case LOAD_USER_MERCH:
      for (let merchPost in action.payload) {
        newState[merchPost.id] = merchPost;
      }
      return newState;
    case UPLOAD_MERCH:
      newState.push(action.merchPost.merch_post);
      return newState;
    default:
      return state;
  }
}
