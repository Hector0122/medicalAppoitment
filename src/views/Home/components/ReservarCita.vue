<template>
  <v-dialog v-model="dialog" max-width="300px">
    <v-card>
      <v-card-title class="headline">Reservar Cita</v-card-title>
      <v-container class="d-flex flex-column justify-center align-center">
        <template v-if="specialitySelected">
          <v-card-title>Especialidades</v-card-title>
          <v-radio-group v-model="selectedSpeciality" row>
            <v-radio
              v-for="speciality in especialidades"
              :key="speciality.id"
              :value="speciality.name"
            >
              {{ speciality.name }}
            </v-radio>
          </v-radio-group>
        </template>
        <template v-else>
          <v-card-title>{{ selectedSpeciality }}</v-card-title>
          <v-radio-group v-model="selectedDoctor" row v-if="doctorsSelected">
            <v-radio
              v-for="doctor in filteredDoctors"
              :key="doctor"
              :value="doctor"
            >
              {{ doctor }}
            </v-radio>
          </v-radio-group>
        </template>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="handleCancelClick">
          {{ specialitySelected ? "Cancelar" : "Atrás" }}
        </v-btn>
        <v-btn color="blue darken-1" text @click="handleReserveClick">
          {{ specialitySelected ? "Aceptar" : "Reservar" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      especialidades: [],
      doctores: [],
      selectedSpeciality: "",
      selectedDoctor: "",
      specialitySelected: true,
      doctorsSelected: false,
    };
  },
  props: {
    fecha_seleccionada: String,
    user_id: Number,
  },
  mounted() {
    axios.get("http://localhost:3000/speciality").then((res) => {
      this.especialidades = res.data;
    });

    axios.get("http://localhost:3000/doctor").then((res) => {
      this.doctores = res.data;
    });
  },
  computed: {
    filteredDoctors() {
      const selectedSpecialityId = this.especialidades.find(
        (speciality) => speciality.name === this.selectedSpeciality
      ).id;
      const filteredDoctors = this.doctores.filter(
        (doctor) => doctor.speciality_id === selectedSpecialityId
      );
      return filteredDoctors.map((doctor) => doctor.name);
    },
  },

  methods: {
    handleCancelClick() {
      this.dialog = false;
      this.specialitySelected = true;
      this.doctorsSelected = false;
      this.selectedSpeciality = "";
      this.selectedDoctor = "";
    },

    handleReserveClick() {
      if (this.specialitySelected) {
        this.specialitySelected = false;
        this.doctorsSelected = true;
      } else {
        const appointment = {
          title: this.selectedSpeciality + " con " + this.selectedDoctor,
          date: this.fecha_seleccionada,
          user_id: this.user_id,
          doctor_id: this.doctores.find(
            (doctor) => doctor.name === this.selectedDoctor
          ).id,
        };
        axios
          .post("http://localhost:3000/appointments", appointment)
          .then(() => {
            this.dialog = false;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>
