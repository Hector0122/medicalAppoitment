
<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Nombre</th>
        <th class="text-left">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="especialidad in especialidades" :key="especialidad.name">
        <td>{{ especialidad.name }}</td>
        <td>
          <v-btn icon color="primary" @click="editItem(doctor.id)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="deep-orange" @click="deleteItem(doctor.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>


<script>
import axios from "axios";

export default {
  name: "TablaInfoEspecialidades",
  data() {
    return {
      especialidades: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/speciality").then((response) => {
      this.especialidades = response.data;
    });
  },
};
</script>
