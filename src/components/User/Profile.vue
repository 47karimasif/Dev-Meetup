<template>
  <!-- <h3>{{User.id}}</h3> -->
  <h3 class="text-center grey--text">Hello User </h3>
</template>

<script>
import { ref, watchEffect } from "@vue/composition-api";
import { useGetters } from "@u3u/vue-hooks";
export default {
  name: "Profile",
  setup() {
    const { User } = useGetters(["User"]);
    const user = ref(User.value);
    watchEffect(() => {
      user.value = User.value;
    });
    return {
      User,
    };
  },
};
</script>

<style></style>
