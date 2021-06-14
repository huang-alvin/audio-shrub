const LOAD_FEATURES = "LOAD_FEATURES";
const LOAD_NEW_POSTS = "LOAD_NEW";
const LOAD_SELLING_NOW_POSTS = "LOAD_SELLING";
const UPDATE_SELLING_NOW_POSTS = "UPDATE_SELLING";

// ======= SELLING NOW POSTS =======
const loadSellingPosts = (posts) => ({
  type: LOAD_SELLING_NOW_POSTS,
  payload: posts,
});

export const fetchSellingNowPosts = () => async (dispatch) => {
  const res = await fetch("/api/music-post/selling-now");
  const result = await res.json();
  console.log(result);
  // dispatch(loadSellingPosts(result.posts));
};

// =======  NEW POSTS==========
const loadNewPosts = (posts) => ({
  type: LOAD_NEW_POSTS,
  payload: posts,
});

export const fetchNewPosts = () => async (dispatch) => {
  const res = await fetch("/api/music-post/new");
  const result = await res.json();

  dispatch(loadNewPosts(result.newPosts));
};

// ======= FEATURED POSTS ======

const loadFeatured = (posts) => ({
  type: LOAD_FEATURES,
  payload: posts,
});

export const fetchFeatured = () => async (dispatch) => {
  const res = await fetch("/api/music-post/featured");
  const result = await res.json();

  dispatch(loadFeatured(result.featuredPosts));
};

const initialState = { featured: null, new: null, sellingNow: null };
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_FEATURES:
      newState.featured = action.payload;
      return newState;
    case LOAD_NEW_POSTS:
      newState.new = action.payload;
      return newState;
    // case LOAD_SELLING_NOW_POSTS:

    //   newState.sellingNow =
    default:
      return state;
  }
}
