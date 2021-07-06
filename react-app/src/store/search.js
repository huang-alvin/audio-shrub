const FETCH_SEARCH = "FETCH_SEARCH";

const fetchSearch = (searchRes) => ({
  action: FETCH_SEARCH,
  payload: searchRes,
});

// export const searchReq = (input) => async(dispatch) => {
//     const res = await fetch('/api/users/search', {
//         method:"POST",
//         content
//     })
// }
