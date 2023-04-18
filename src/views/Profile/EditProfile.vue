<template>
  <div class="d-flex justify-center px-4 py-6">
    <v-card class="mx-auto mb-10 px-5 py-6" density="comfortable">
      <v-form>
        <div class="d-flex flex-column justify-center align-center mb-3">
          <v-avatar class="ma-3" size="125" rounded="1">
            <img :src="paciente.avatar" ref="avatarPreview" />
          </v-avatar>
          <input type="file" ref="fileInput" @change="handleFileUpload" />
        </div>
        <v-text-field
          v-model="paciente.name"
          label="Nombre"
          class="mb-3"
        ></v-text-field>
        <v-text-field
          v-model="paciente.age"
          label="Edad"
          class="mb-3"
        ></v-text-field>
        <v-text-field
          v-model="paciente.phone"
          label="Teléfono"
          class="mb-3"
        ></v-text-field>
        <v-text-field
          v-model="paciente.address"
          label="Dirección"
          class="mb-3"
        ></v-text-field>
        <v-text-field
          v-model="paciente.alergias"
          label="Alergias"
          class="mb-3"
        ></v-text-field>
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
      paciente: {},
    };
  },
  async mounted() {
    const sesion = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get("http://localhost:3000/pacientes");
    this.paciente = response.data.find(
      (paciente) => paciente.paciente_id === sesion.id
    );
  },
  methods: {
    async updateProfile() {
      const formValue = {
        name: this.paciente.name,
        age: this.paciente.age,
        phone: this.paciente.phone,
        address: this.paciente.address,
        alergias: this.paciente.alergias,
        paciente_id: this.paciente.paciente_id,
        avatar: "https://placebeard.it/640x360",
      };

      let response;
      if (this.paciente.paciente_id) {
        response = await axios.put(
          `http://localhost:3000/pacientes/${this.paciente.id}`,
          formValue
        );

        this.$router.push("/home");
      } else {
        const newUser = await axios
          .get("http://localhost:3000/users")
          .then((res) => {
            return res.data[res.data.length - 1];
          });

        response = await axios.post("http://localhost:3000/pacientes", {
          ...formValue,
          paciente_id: newUser.id,
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
        this.paciente.avatar = reader.result;
        this.$refs.avatarPreview.src = reader.result;
      };

      reader.readAsDataURL(file);
    },
  },
};
</script>
