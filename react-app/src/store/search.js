const LOAD_SEARCH_RESULTS = "LOAD_SEARCH_RESULTS";
const LOAD_REACTIVE_SEARCH_RESULTS = "LOAD_REACTIVE_SEARCH_RESULTS";
const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
const CLEAR_REACTIVE_SEARCH_RESULTS = "CLEAR_REACTIVE_SEARCH_RESULTS";

const fetchSearch = (searchRes) => ({
  type: LOAD_SEARCH_RESULTS,
  payload: searchRes,
});

const loadReactSearch = (searchRes) => ({
  type: LOAD_REACTIVE_SEARCH_RESULTS,
  payload: searchRes,
});
const clearReactiveSearch = () => ({
  type: LOAD_REACTIVE_SEARCH_RESULTS,
});
const clearSearch = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

export const clearSearchRes = () => (dispatch) => {
  dispatch(clearSearch());
};

export const clearReactiveSearchRes = () => (dispatch) => {
  dispatch(clearReactiveSearch());
};

export const searchReq = (input) => async (dispatch) => {
  const res = await fetch("/api/search", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const searchRes = await res.json();
  // TO DO ERR HANDLING
  dispatch(fetchSearch(searchRes.search_res));
};

export const reactiveSearchReq = (input) => async (dispatch) => {
  const res = await fetch("/api/search/reactive", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const searchRes = await res.json();
  // TO DO ERR HANDLING
  dispatch(loadReactSearch(searchRes.search_res));
};

const initialState = { result: [], reactiveRes: [] };
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_SEARCH_RESULTS:
      newState["result"] = action.payload;
      return newState;
    case LOAD_REACTIVE_SEARCH_RESULTS:
      newState["reactiveRes"] = action.payload;
      return newState;
    case CLEAR_SEARCH_RESULTS:
      newState["result"] = [];
      return newState;
    case CLEAR_REACTIVE_SEARCH_RESULTS:
      newState["reactiveRes"] = [];
    default:
      return state;
  }
}
