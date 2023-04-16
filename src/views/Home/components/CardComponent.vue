<template>
  <v-card class="rounded-lg" width="1200">
    <div class="d-flex flex-no-wrap">
      <v-card
        class="d-flex flex-no-wrap justify-space-between v-col-3 align-center"
        color="primary"
      >
        <v-avatar class="ma-3" size="125" rounded="1">
          <img :src="paciente.avatar" />
        </v-avatar>
        <div class="d-flex flex-md-column">
          <v-card-title class="bold">{{ paciente.name }}</v-card-title>

          <v-card-subtitle>{{ paciente.age }} años</v-card-subtitle>
        </div>
      </v-card>
      <v-card
        class="d-flex v-col-9 justify-space-around align-center"
        color="#E3F2FD"
      >
        <div>
          <v-card-subtitle> Phone Number</v-card-subtitle>
          <v-card-text class="mb-6 bold">{{ paciente.phone }}</v-card-text>

          <v-card-subtitle> Address</v-card-subtitle>
          <v-card-text>{{ paciente.address }}</v-card-text>
        </div>

        <div>
          <v-card-subtitle> Alergias</v-card-subtitle>
          <v-card-text class="mb-6">{{ paciente.alergias }}</v-card-text>

          <v-card-subtitle> Alergias</v-card-subtitle>
          <v-card-text>{{ paciente.alergias }}</v-card-text>
        </div>
      </v-card>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      paciente: {},
    };
  },
  created() {
    const sesion = JSON.parse(localStorage.getItem("user"));

    axios.get("http://localhost:3000/pacientes").then((res) => {
      this.paciente = res.data.find(
        (paciente) => paciente.paciente_id === sesion.id
      );
    });
  },
};
</script>
