// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_USER_IMAGE = "session/SET_USER_IMAGE";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setUserImage = (image) => ({
  type: SET_USER_IMAGE,
  payload: image,
});

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.errors) {
    return;
  }

  dispatch(setUser(data));
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  }

  dispatch(setUser(data));
  return {};
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  dispatch(removeUser());
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  }

  dispatch(setUser(data));
  return {};
};

export const updateUserImage = (form) => async (dispatch) => {
  const res = await fetch("/api/upload/profile-image", {
    method: "POST",
    body: form,
  });

  const image = await res.json();
  if (image.url) {
    dispatch(setUserImage(image));
  }
  return image;
};

const initialState = { user: null };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      let newState = { user: action.payload };
      let music = {};
      let merch = {};
      for (let i = 0; i < newState["user"]["collection"].length; i++) {
        let post = newState["user"]["collection"][i];
        if (post.by) {
          music[post.id] = post;
        } else {
          merch[post.id] = post;
        }
      }
      newState["user"]["normCollection"] = { music: music, merch: merch };
      return newState;
    }
    case REMOVE_USER: {
      return { user: null };
    }
    case SET_USER_IMAGE: {
      let newState = { ...state };
      newState["user"]["image"] = action.payload.url;
      newState["user"]["updated"] = action.payload.updated;
      return newState;
    }
    default:
      return state;
  }
}
