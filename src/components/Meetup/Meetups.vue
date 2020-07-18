<template>
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
  <v-container class="mt-5" v-else>
    <v-row v-for="meetup in Meetups" :key="meetup.id">
      <v-col cols="12" sm="8" offset-sm="2">
        <v-card class="info" text>
          <v-container fluid>
            <v-row>
              <!-- image -->
              <v-col cols="6" md="5"
                >
                <v-img :src="meetup.imageUrl" height="130px"> </v-img
              ></v-col>
              <v-col cols="6" md="7">
                <div>
                  <h2 class="white--text">{{ meetup.title }}</h2>
                  <div class="caption">{{ meetup.date }} {{ meetup.time }}</div>
                  <v-btn
                    text
                    class=" black--text mt-4"
                    :to="'/meetups/' + meetup.id"
                  >
                    <v-icon left>fas fa-arrow-right</v-icon>
                    View Meetup
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useGetters } from "@u3u/vue-hooks";
import { ref, watchEffect } from "@vue/composition-api";
export default {
  name: "Meetups",
  setup() {
    const { loadedMeetups, Loading } = useGetters(["loadedMeetups", "Loading"]);
    const loading = ref(Loading.value);
    const Meetups = ref(loadedMeetups.value);
    watchEffect(() => {
      (loading.value = Loading.value), (Meetups.value = loadedMeetups.value);
    });
    return {
      Meetups,
      loading,
    };
  },
};
</script>

<style></style>
