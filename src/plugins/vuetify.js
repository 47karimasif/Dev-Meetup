import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken2,
        secondary: colors.grey.lighten1,
        accent: colors.red.accent2,
        info: colors.blue.lighten1,
        error: colors.red.accent4,
        success: colors.green.lighten2,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});
