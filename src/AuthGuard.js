import store from "./store";

export default (to, from, next) => {
  if (store.getters.User) {
    next();
  } else {
    next("/signin");
  }
};
