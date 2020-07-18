<template>
  <v-container class="mt-5">
    <v-row>
      <v-col cols="12" sm="8" md="6" offset-md="3" offset-sm="2">
        <h1 class="secondary--text">Create new Meetup</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="8" md="6" offset-md="3" offset-sm="2">
        <v-form @submit.prevent="onFormSubmit">
          <v-text-field
            name="title"
            label="Title"
            id="title"
            required
            v-model="formdata.title"
          >
          </v-text-field>
          <v-text-field
            name="location"
            label="Location"
            id="location"
            required
            v-model="formdata.location"
          >
          </v-text-field>
          <!-- <v-text-field
            name="imageUrl"
            label="Image Url"
            id="imageUrl"
            required
            v-model="formdata.imageUrl"
          >
          </v-text-field> -->
          <v-file-input multiple label="Upload Image" flat  ref="fileInput" accept="image/*" @change="OnFilePicked"></v-file-input>
          <img :src="formdata.imageUrl" height="200" />
          <v-row>
            <v-col>
              <h4 class="my-3">Choose a date</h4>
              <v-date-picker v-model="formdata.date"> </v-date-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4 class="my-3">Choose a time</h4>
              <v-time-picker  v-model="formdata.time"> </v-time-picker>
            </v-col>
          </v-row>

          <v-textarea
            name="description"
            label="Description"
            id="description"
            required
            v-model="formdata.description"
          >
          </v-textarea>
          <v-btn class="primary mt-4" :disabled="!formIsValid" type="submit">
            Create Meetup
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { reactive, computed } from "@vue/composition-api";
import { useActions, useRouter } from "@u3u/vue-hooks";
export default {
  name: "CreateMeetup",
  setup() {
    const { CreateMeetup } = useActions(["CreateMeetup"]);
    const { router } = useRouter();

    const formdata = reactive({
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      date: new Date().toISOString().substr(0, 10),
      time: null,
      image: null,
    });

    const formIsValid = computed(() => {
      return (
        formdata.title !== "" &&
        formdata.location !== "" &&
        formdata.imageUrl !== "" &&
        formdata.description !== ""
      );
    });

    const OnFilePicked = event => {
      if (event[0]) {
        // let filename = event[0].name;
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          formdata.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(event[0]);
        formdata.image = event[0];
      } else {
        console.log("no file selected");
        formdata.imageUrl = "";
      }
    };

    const onFormSubmit = () => {
      if (!formIsValid) {
        return;
      }
      CreateMeetup({
        title: formdata.title,
        location: formdata.location,
        image: formdata.image,
        description: formdata.description,
        date: formdata.date,
        time: formdata.time,
      });
      router.push("/meetups");
    };
    return {
      formdata,
      formIsValid,
      onFormSubmit,
      OnFilePicked,
    };
  },
};
</script>

<style></style>
