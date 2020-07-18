import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCompositionApi from "@vue/composition-api";
import hooks from "@u3u/vue-hooks";
import Alert from "./components/Shared/Alert";
import EditMeetupDialogue from "./components/Meetup/Edit/EditMeetupDialogue";
import { auth } from "./firebase/init";

Vue.use(hooks);
Vue.use(VueCompositionApi);
Vue.component("app-alert", Alert);
Vue.component("edit-meetup-dialogue", EditMeetupDialogue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    this.$store.dispatch("LoadMeetup");
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("AutoSignIn", user);
      }
    });
  }
}).$mount("#app");
