const LOAD_SEARCH_RESULTS = "LOAD_SEARCH_RESULTS";
const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";

const fetchSearch = (searchRes) => ({
  type: LOAD_SEARCH_RESULTS,
  payload: searchRes,
});

const clearSearch = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

export const clearSearchRes = () => (dispatch) => {
  dispatch(clearSearch());
};

export const searchReq = (input) => async (dispatch) => {
  const res = await fetch("/api/search", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const searchRes = await res.json();
  // TO DO ERR HANDLING
  dispatch(fetchSearch(searchRes));
};

export const reactiveSearchReq = (input) => async (dispatch) => {
  const res = await fetch("/api/search/reactive", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const searchRes = await res.json();
  // TO DO ERR HANDLING
  dispatch(fetchSearch(searchRes));
};

const initialState = { result: [] };
export default function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_SEARCH_RESULTS:
      newState["result"] = action.payload.search_res;
      return newState;
    case CLEAR_SEARCH_RESULTS:
      newState["result"] = [];
      return newState;
    default:
      return state;
  }
}
