<template>
  <nav>
    <v-app-bar flat app dark class="primary">
      <v-app-bar-nav-icon
        @click="sidenav = !sidenav"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-btn text>
          <router-link to="/" class="white--text" style="text-decoration:none">
            Dev-MeetUp
          </router-link>
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link in links"
          :key="link.title"
          text
          router
          :to="link.route"
        >
          <v-icon left>{{ link.icon }}</v-icon>
          <span>{{ link.title }}</span>
        </v-btn>
        <v-btn text v-if="auth" @click="OnLogout">
          <v-icon left >fas fa-sign-out-alt</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!-- sidenav -->
    <v-navigation-drawer v-model="sidenav" app disable-resize-watcher>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.title"
          router
          :to="link.route"
        >
          <v-list-item-icon
            ><v-icon>{{ link.icon }}</v-icon></v-list-item-icon
          >
          <v-list-item-content>{{ link.title }}</v-list-item-content>
        </v-list-item>
        <v-list-item v-if="auth" @click="OnLogout">
          <v-list-item-icon><v-icon>fas fa-sign-out-alt</v-icon></v-list-item-icon>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { ref, watchEffect } from "@vue/composition-api";
import { useGetters, useActions, useRouter } from "@u3u/vue-hooks";

export default {
  name: "Navbar",
  setup() {
    const sidenav = false;
    const { User } = useGetters(["User"]);
    const { LogOut } = useActions(["LogOut"]);
    const { router } = useRouter(["router"]);

    const signedInLinks = [
      { icon: "fas fa-users", title: "View Meetups", route: "/meetups" },
      {
        icon: "fas fa-map-marker-alt",
        title: "Organize Meetup",
        route: "/meetup/new",
      },
      { icon: "fas fa-user", title: "Profile", route: "/profile" },
    ];
    const signedOutLinks = [
      { icon: "mdi-face", title: "Sign Up", route: "/signup" },
      { icon: "fas fa-lock-open", title: "Sign In", route: "/signin" },
    ];

    let links = ref([]); //watch is watching this ref links value which depends on user whenever user changes auth change and result in links change which case auto re-render of navbar,We can Even use watchEffect just links needed to be ref
    let auth = ref(false);
    watchEffect(() => {
      if (User.value !== null && User.value !== undefined) {
        auth.value = true;
      }
      links.value = auth.value ? signedInLinks : signedOutLinks;
    });

    const OnLogout = async () => {
      await LogOut();
      auth.value = false;
      router.push("/signin");
    };

    return {
      sidenav,
      links,
      auth,
      OnLogout,
    };
  },
};
</script>

<style></style>
