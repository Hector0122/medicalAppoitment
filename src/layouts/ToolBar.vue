<template>
  <v-card flat rounded="0" class="mb-5">
    <v-toolbar app color="#1d63a8" density="compact">
      <v-menu v-model="menu" right>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
            class="ml-auto"
            color="white"
            @click="menu = !menu"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="item.action()"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </v-card>
</template>

<style scoped>
.v-overlay {
  position: absolute;
  left: calc(100% - 150px) !important;
  top: 50px !important;
}
</style>

<script>
import { DOCTOR } from "@/constants/Role";

export default {
  data() {
    return {
      menu: false,
      items: [
        {
          text: "Logout",
          action: this.logout,
        },
        {
          text: "Editar Perfil",
          action: () => {
            const r = localStorage.getItem("user")
            const user = JSON.parse(r);
            user.role === DOCTOR
              ? this.$router.push("/profile-doctor")
              : this.$router.push("/profile");
          },
        },
      ],
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      window.location.href = "/login";
    },
  },
};
</script>
