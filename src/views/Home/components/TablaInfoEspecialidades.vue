
<template>
  <v-table>
    <thead>
      <tr>
        <th class="font-weight-black">Nombre</th>
        <th class="font-weight-black">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="especialidad in especialidades" :key="especialidad.name">
        <td>{{ especialidad.name }}</td>
        <td>
          <v-btn icon color="primary" @click="editItem(especialidad.id)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="deep-orange" @click="deleteItem(especialidad.id)">
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
  methods: {
    editItem(item) {
      console.log(item);

    },
    deleteItem(item) {
      if (window.confirm("¿Está seguro que desea eliminar registro de esta Especialidad?")) {
        this.deleteEspecialidad(item);
      }
    },
    deleteEspecialidad(id) {
      axios
        .delete(`http://localhost:3000/speciality/${id}`)
        .then(() => {
          this.especialidades = this.especialidades.filter((especialidad) => especialidad.id !== id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
