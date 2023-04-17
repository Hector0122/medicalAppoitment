<template>
  <div class="d-flex justify-center px-4 py-6">
    <v-card class="mx-auto mb-10 px-5 py-6" density="comfortable">
      <v-form>
        <div class="d-flex flex-column justify-center align-center mb-3">
          <v-avatar class="ma-3" size="125" rounded="1">
            <img :src="doctor.avatar" ref="avatarPreview" />
          </v-avatar>
          <input type="file" ref="fileInput" @change="handleFileUpload" />
        </div>
        <v-text-field
          v-model="doctor.name"
          label="Nombre"
          class="mb-3"
        ></v-text-field>
        <v-text-field
          v-model="doctor.phone"
          label="Teléfono"
          class="mb-3"
        ></v-text-field>
        <v-select
          v-model="select"
          :items="specialties"
          item-title="name"
          item-value="id"
          label="Especialidad"
          persistent-hint
          return-object
          single-line
        ></v-select>

        <v-btn @click="updateProfile" class="mx-auto">Actualizar perfil</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      doctor: {},
      specialties: [],
      select: {
        name: "Cardiología",
        id: 0,
      },
    };
  },
  async mounted() {
    const sesion = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get("http://localhost:3000/doctor");
    this.doctor = response.data.find(
      (doctor) => doctor.doctor_id === sesion.id
    );

    axios.get("http://localhost:3000/speciality").then((res) => {
      this.specialties = res.data;
    });
  },
  methods: {
    async updateProfile() {
      const formValue = {
        doctor_id: this.doctor.doctor_id,
        name: this.doctor.name,
        speciality_id: this.select.id,
        phone: this.doctor.phone,
        avatar: "https://placebeard.it/640x360",
      };

      let response;
      if (this.select.id) {
        console.log("update");
        response = await axios.put(
          `http://localhost:3000/doctor/${this.doctor.id}`,
          formValue
        );

        this.$router.push("/doctor");
      } else {
        const newUser = await axios
          .get("http://localhost:3000/users")
          .then((res) => {
            return res.data[res.data.length - 1];
          });

        response = await axios.post("http://localhost:3000/doctor", {
          ...formValue,
          doctor_id: newUser.id,
        });

        if (response) {
          this.$router.push("/login");
        }
      }
    },

    handleFileUpload() {
      const file = this.$refs.fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.doctor.avatar = reader.result;
        this.$refs.avatarPreview.src = reader.result;
      };

      reader.readAsDataURL(file);
    },
  },
};
</script>
