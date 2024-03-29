import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Meetups from "./components/Meetup/Meetups";
import CreateMeetup from "./components/Meetup/CreateMeetup";
import Profile from "./components/User/Profile";
import Signin from "./components/User/Signin";
import Signup from "./components/User/Signup";
import Meetup from "./components/Meetup/Meetup";
import AuthGard from "./AuthGuard";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/meetups",
      name: "Meetups",
      component: Meetups
    },
    {
      path: "/meetup/new",
      name: "CreateMeetup",
      component: CreateMeetup,
      beforeEnter: AuthGard
    },
    {
      path: "/meetups/:id",
      props: true,
      name: "meetups",
      component: Meetup
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      beforeEnter: AuthGard
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    }
  ]
});
