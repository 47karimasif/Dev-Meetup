<template>
  <v-container class="mt-5">
    <v-row wrap>
      <v-col cols="12" sm="6" class="text-center text-sm-right">
        <v-btn large router to="/meetups" class="info">
          Explore Meetups
        </v-btn> </v-col
      ><v-col cols="12" sm="6" class="text-center text-sm-left">
        <v-btn large router to="/meetup/new" class="info">
          Organize Meetups
        </v-btn>
      </v-col>
    </v-row>

    <!-- loader -->
    <v-row v-if="loading">
      <v-col cols="12"> 
        <v-card height="70vh" flat class=" d-flex justify-center align-center">
          <v-progress-circular
        size="70"
      indeterminate
      color="primary"
    ></v-progress-circular>
        </v-card>
      </v-col>
    </v-row>

    <!-- carousel -->
    <!-- content -->
    <v-row class="my-5" v-if="!loading">
      <v-col cols="12">
        <v-card max-width="600" class="mx-auto" flat>
          <v-carousel
            height="400px"
            cycle
            interval="10000"
            style="cursor:pointer"
          >
            <v-carousel-item
              v-for="meetup in Meetups"
              :key="meetup.id"
              :src="meetup.imageUrl"
              @click="onLoadMeetup(meetup.id)"
            >
              <v-row class="justify-center" style="height: 350px;">
                <v-col cols="12" class="text-center title" align-self="end">
                  {{ meetup.title }}
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
          <div class="pa-2 red--text">
            Join Our Awesome Meetup !!
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRouter, useGetters } from "@u3u/vue-hooks";
import { ref, watchEffect } from "@vue/composition-api";

export default {
  name: "Home",
  components: {},
  setup() {
    const { router } = useRouter();
    const { featuredMeetups, Loading } = useGetters([
      "featuredMeetups",
      "Loading",
    ]);
    const loading = ref(Loading.value);
    const Meetups = ref(featuredMeetups.value);

    watchEffect(() => {
      loading.value = Loading.value;
      Meetups.value = featuredMeetups.value;
    });
    const onLoadMeetup = id => {
      router.push("/meetups/" + id);
    };
    return {
      Meetups,
      onLoadMeetup,
      loading,
    };
  },
};
</script>

<style>
.title {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1.5rem;
  padding: 20px;
}
</style>

in carousal this can also be used in place @click function // :to="{ // name:
'meetups', // params: { // id: meetup.id, // }, // }"
