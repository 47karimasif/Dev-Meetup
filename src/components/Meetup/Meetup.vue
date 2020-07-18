<template>
  <v-container class="mt-5">
    <!-- loader -->
    <v-row v-if="loading">
      <v-col cols="12"> 
        <v-card height="80vh" flat class=" d-flex justify-center align-center">
          <v-progress-circular
        size="70"
      indeterminate
      color="primary"
    ></v-progress-circular>
        </v-card>
      </v-col>
    </v-row>
    <!-- content -->
    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-card-title class="primary--text">{{ Meetup.title }}
            <v-spacer></v-spacer>
              <edit-meetup-dialogue v-if="showEditButton" :Meetup = "Meetup"></edit-meetup-dialogue>
          </v-card-title>
          <v-img :src="Meetup.imageUrl" height="400px"> </v-img>
          <v-card-text>
            <div class="info--text">
              {{ Meetup.date }} {{ Meetup.location }}
            </div>
            <div>
              {{ Meetup.description }}
            </div>
          </v-card-text>
          <v-card-actions
            ><v-spacer></v-spacer
            ><v-btn class="primary">Register</v-btn></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useGetters } from "@u3u/vue-hooks";
import { ref, watchEffect } from "@vue/composition-api";
export default {
  name: "Meetup",
  props: ["id"],
  setup(props) {
    const { loadedMeetup, User, Loading } = useGetters([
      "loadedMeetup",
      "User",
      "Loading",
    ]);
    const loading = ref(Loading.value);
    const Meetup = ref(loadedMeetup.value(props.id));
    const user = ref(User.value);
    const auth = ref(false);
    let showEditButton = ref(false);

    // since these all are ref value vue will render automatically when it gets changed through watcheffect
    watchEffect(() => {
      loading.value = Loading.value;
      Meetup.value = loadedMeetup.value(props.id);
      if (User.value !== null && User.value !== undefined) {
        auth.value = true;
        user.value = User.value;
      }
      if (!loading.value) {
        if (auth.value && user.value.id === Meetup.value.creatorId) {
          showEditButton.value = true;
        }
      }
    });
    return {
      Meetup,
      showEditButton,
      loading,
    };
  },
};
</script>

<style></style>
