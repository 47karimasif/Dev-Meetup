<template>
  <v-container class="mt-5">
    <v-row v-if="errorMsg">
      <v-col cols="12" sm="6" offset-sm="3">
        <app-alert @dismissed = "onDismissed" :errorMsg = "errorMsg"></app-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-row>
                <v-col cols="12"
                  ><v-text-field
                    name="email"
                    label="Mail"
                    id="email"
                    type="email"
                    required
                    v-model="formdata.email"
                  ></v-text-field
                ></v-col>
              </v-row>
              <v-row>
                <v-col cols="12"
                  ><v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    required
                    v-model="formdata.password"
                  ></v-text-field
                ></v-col>
              </v-row> 
              <v-row>
                <v-col cols="12">
                  <v-btn type="submit" :disabled="!formIsValid" :loading="loading">Sign In</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, reactive, computed, watchEffect } from "@vue/composition-api";
import { useActions, useGetters, useRouter } from "@u3u/vue-hooks";
export default {
  name: "Signin",
  setup() {
    const { SignUserIn, ClearError } = useActions(["SignUserIn", "ClearError"]);
    const { User, Loading, Error } = useGetters(["User", "Loading", "Error"]);
    const { router } = useRouter();
    let loading = ref(Loading.value);
    let errorMsg = ref(Error.value);
    // for clearing any error on initial rendering of page
    ClearError();

    // checking the loading and errorMsg value whenevr getters updates in store
    watchEffect(() => {
      if (User.value !== null) {
        router.push("/");
      }
      loading.value = Loading.value;
      errorMsg.value = Error.value;
    });

    const formdata = reactive({
      email: "",
      password: "",
    });

    const formIsValid = computed(() => {
      return formdata.email !== "" && formdata.password !== "";
    });
    const onSubmit = () => {
      SignUserIn(formdata);
    };

    const onDismissed = () => {
      ClearError();
    };

    return {
      formdata,
      onSubmit,
      formIsValid,
      onDismissed,
      loading,
      errorMsg,
    };
  },
};
</script>

<style></style>