<template>
  <v-card class="rounded-lg" width="1200">
    <div class="d-flex flex-no-wrap">
      <v-card
        class="d-flex flex-no-wrap justify-space-between v-col-3 align-center"
        color="primary"
      >
        <v-avatar class="ma-3" size="125" rounded="1">
          <img :src="doctor.avatar" />
        </v-avatar>
        <div class="d-flex flex-md-column">
          <v-card-title class="white--text">
            Dr. {{ doctor.name }}
          </v-card-title>
        </div>
      </v-card>
      <v-card
        class="d-flex v-col-9 justify-space-around align-center"
        color="#E3F2FD"
      >
        <div>
          <v-card-subtitle> Speciality</v-card-subtitle>
          <v-card-text class="mb-6 bold">
            {{ getSpecialityName(doctor.speciality_id) }}
          </v-card-text>
        </div>
        <div>
          <v-card-subtitle> Phone Number</v-card-subtitle>
          <v-card-text class="mb-6 bold">{{ doctor.phone }}</v-card-text>
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
      doctor: {},
      specialities: [],
    };
  },
  created() {
    const sesion = JSON.parse(localStorage.getItem("user"));

    axios.get("http://localhost:3000/doctor").then((res) => {
      this.doctor = res.data.find((doctor) => doctor.doctor_id === sesion.id);
    });
  },

  mounted() {
    axios.get("http://localhost:3000/speciality").then((res) => {
      this.specialities = res.data;
    });
  },

  methods: {
    getSpecialityName(id) {
      return this.specialities.find((speciality) => speciality.id === id)?.name;
    },
  },
};
</script>
