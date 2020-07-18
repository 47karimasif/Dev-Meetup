<template>
    <v-dialog v-model="dialog" persistent max-width="400" overlay-opacity="0.9">
      <template v-slot:activator="{ on }">
        <v-btn fab v-on="on">
            <v-icon>fas fa-edit</v-icon>
        </v-btn>
      </template>
      <v-card>
          <v-container>
          <v-row>
              <v-col cols="12">
                  <v-card-title class="headline">Edit Meetup</v-card-title>
              </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
              <v-col cols="12">
                  <v-card-text>
                      <v-text-field
                      name="title"
                      label="Title"
                      id="title"
                      required
                      v-model="FormData.editedTitle"
                      ></v-text-field>
                  </v-card-text>
                  <v-card-text>
                      <v-text-field
                      name="description"
                      label="Description"
                      id="description"
                      required
                      v-model="FormData.editedDescription"
                      ></v-text-field>
                  </v-card-text>
              </v-col>
          </v-row>
          <v-row>
              <v-col cols="12">
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="dialog = false">close</v-btn>
                      <v-btn color="green darken-1" text @click="OnSaveChanges">save</v-btn>
                  </v-card-actions>
              </v-col>
          </v-row>
      </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
import { useActions } from "@u3u/vue-hooks";
export default {
  name: "EditMeetupDialogue",
  props: ["Meetup"],
  setup(props) {
    //if i keep dialog value true the content will automatically popup without clicking on that edit icon
    let dialog = ref(false);
    const { UpdateMeetupData } = useActions(["UpdateMeetupData"]);

    const FormData = reactive({
      editedTitle: props.Meetup.title,
      editedDescription: props.Meetup.description,
    });
    const OnSaveChanges = () => {
      if (
        FormData.editedTitle.trim() === "" ||
        FormData.editedDescription.trim() === ""
      ) {
        return;
      }
      dialog.value = false;
      UpdateMeetupData({
        title: FormData.editedTitle,
        description: FormData.editedDescription,
        id: props.Meetup.id,
      });
    };
    return {
      dialog,
      FormData,
      OnSaveChanges,
    };
  },
};
</script>

<style>
</style>
