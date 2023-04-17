
<template>
  <v-table :items="items" >
    <thead>
      <tr>
        <th class="font-weight-black">Nombre</th>
        <th class="font-weight-black">Especialidad</th>
        <th class="font-weight-black">Telefono</th>
        <th class="font-weight-black">Dirección</th>
        <th class="font-weight-black">Fotografia</th>
        <th class="font-weight-black">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="doctor in doctores" :key="doctor.name">
        <td>{{ doctor.name }}</td>
        <td> {{ doctor.speciality_id }}</td>
        <td>{{ doctor.phone }}</td>
        <td>{{ doctor.address }}</td>
        <td>
          <v-avatar class="ma-3" size="70" rounded="1">
            <img :src="doctor.avatar" />
          </v-avatar>
        </td>
        <td>
          <v-btn icon color="primary"  @click="editItem(doctor.id)">
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
  name: "TablaInfoDoctores",
  data() {
    return {
      doctores: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/doctor").then((response) => {
      this.doctores = response.data;
    });
  },
  methods: {
    editItem(item) {
      console.log(item);

    },
    deleteItem(item) {
      if (window.confirm("¿Está seguro que desea eliminar registro de este doctor?")) {
        this.deleteDoctor(item);
      }
    },
    deleteDoctor(id) {
      axios
        .delete(`http://localhost:3000/doctor/${id}`)
        .then(() => {
          this.doctores = this.doctores.filter((doctor) => doctor.id !== id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
