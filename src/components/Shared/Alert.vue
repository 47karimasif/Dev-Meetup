<template>
        <v-alert type="error" dismissible @input="onClose" :value="true">
            {{errorMsg}}
        </v-alert>
</template>

<script>
export default {
  name: "Alert",
  props: ["errorMsg"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>

