import Vue from "vue";
import Vuex from "vuex";
import db from "./firebase/init";
import { auth, firebaseStorage } from "./firebase/init";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    LoadMeetup: (state, payload) => {
      payload.map(meetup => {
        state.loadedMeetups.push({
          ...meetup.data(),
          id: meetup.id
        });
      });
    },
    CreateMeetup: (state, payload) => {
      state.loadedMeetups.push(payload);
    },
    UpdateMeetupData: (state, payload) => {
      const Meetup = state.loadedMeetups.find(
        meetup => meetup.id === payload.id
      );
      if (payload.title) {
        Meetup.title = payload.title;
      }
      if (payload.description) {
        Meetup.description = payload.description;
      }
    },
    SetUser: (state, payload) => {
      state.user = payload;
    },
    SetError: (state, payload) => {
      state.error = payload;
    },
    SetLoading: (state, payload) => {
      state.loading = payload;
    },
    ClearError: state => {
      state.error = null;
    }
  },
  actions: {
    async LoadMeetup({ commit }) {
      try {
        commit("SetLoading", true);
        const res = await db.collection("meetups").get();
        commit("LoadMeetup", res.docs);
        commit("SetLoading", false);
      } catch (err) {
        console.log(err);
        commit("SetLoading", true);
      }
    },

    async CreateMeetup({ commit, getters }, payload) {
      try {
        const meetup = {
          title: payload.title,
          location: payload.location,
          description: payload.description,
          date: payload.date,
          time: payload.time,
          creatorId: getters.User.id
        };
        const res = await db.collection("meetups").add(meetup);
        let id = res.id;
        // url from firebase
        let imageUrl;
        const filename = payload.image.name;
        const fileData = await firebaseStorage
          .ref("meetups/" + filename)
          .put(payload.image);
        imageUrl = await fileData.ref.getDownloadURL();
        await db
          .collection("meetups")
          .doc(id)
          .update({ imageUrl: imageUrl });

        commit("CreateMeetup", {
          ...meetup,
          id: res.id,
          imageUrl: imageUrl
        });
      } catch (err) {
        console.log(err);
      }
    },

    async UpdateMeetupData({ commit }, payload) {
      try {
        commit("SetLoading", true);
        const UpdateObj = {};
        if (payload.title) {
          UpdateObj.title = payload.title;
        }
        if (payload.description) {
          UpdateObj.description = payload.description;
        }
        await db
          .collection("meetups")
          .doc(payload.id)
          .update(UpdateObj);
        commit("SetLoading", false);
        commit("UpdateMeetupData", payload);
      } catch (err) {
        console.log(err);
        commit("SetLoading", false);
      }
    },

    async SignUserUp({ commit }, payload) {
      try {
        commit("ClearError");
        commit("SetLoading", true);
        const res = await auth.createUserWithEmailAndPassword(
          payload.email,
          payload.password
        );
        console.log(res.user);
        const newUser = {
          id: res.user.uid,
          registeredMeetups: []
        };
        commit("SetUser", newUser);
        commit("SetLoading", false);
      } catch (err) {
        commit("SetLoading", false);
        commit("SetError", err.message);
        console.log(err.message);
      }
    },
    async SignUserIn({ commit }, payload) {
      try {
        commit("SetLoading", true);
        commit("ClearError");
        const res = await auth.signInWithEmailAndPassword(
          payload.email,
          payload.password
        );
        const newUser = {
          id: res.user.uid,
          registeredMeetups: []
        };
        commit("SetUser", newUser);
        commit("SetLoading", false);
      } catch (err) {
        commit("SetLoading", false);
        commit("SetError", err.message);
      }
    },

    AutoSignIn({ commit }, payload) {
      commit("SetUser", { id: payload.uid, registeredMeetups: [] });
    },
    LogOut({ commit }) {
      auth.signOut();
      commit("SetUser", null);
    },
    ClearError({ commit }) {
      commit("ClearError");
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.date > b.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return id => {
        return state.loadedMeetups.find(meetup => meetup.id === id);
      };
    },
    User(state) {
      return state.user;
    },
    Loading(state) {
      return state.loading;
    },
    Error(state) {
      return state.error;
    }
  }
});
