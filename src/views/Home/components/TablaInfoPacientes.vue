
<template>
  <v-table>
    <thead>
      <tr>
        <th class="font-weight-black">Nombre</th>
        <th class="font-weight-black">Edad</th>
        <th class="font-weight-black">Telefono</th>
        <th class="font-weight-black">Dirección</th>
        <th class="font-weight-black">Alergias</th>
        <th class="font-weight-black">Fotografia</th>
        <th class="font-weight-black">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="paciente in pacientes" :key="paciente.name">
        <td>{{ paciente.name }}</td>
        <td>{{ paciente.age }}</td>
        <td>{{ paciente.phone }}</td>
        <td>{{ paciente.address }}</td>
        <td>{{ paciente.alergias }}</td>
        <td>
          <v-avatar class="ma-3" size="70" rounded="1">
            <img :src="paciente.avatar" />
          </v-avatar>
        </td>
        <td>
          <v-btn icon color="primary" @click="editItem(paciente.id)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="deep-orange" @click="deleteItem(paciente.id)">
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
  name: "TablaInfoPacientes",
  data() {
    return {
      pacientes: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/pacientes").then((response) => {
      this.pacientes = response.data;
    });
  },
  methods: {
    editItem(item) {
      console.log(item);

    },
    deleteItem(item) {
      if (window.confirm("¿Está seguro que desea eliminar registro de este Paciente?")) {
        this.deletePaciente(item);
      }
    },
    deletePaciente(id) {
      axios
        .delete(`http://localhost:3000/pacientes/${id}`)
        .then(() => {
          this.pacientes = this.pacientes.filter((paciente) => paciente.id !== id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
