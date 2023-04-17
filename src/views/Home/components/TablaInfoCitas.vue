
<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Fecha</th>
        <th class="text-left">Paciente</th>
        <th class="text-left">Doctor</th>
        <th class="text-left">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cita in citas" :key="cita.id">
        <td>{{ cita.date }}</td>
        <td>{{ cita.user_id }}</td>
        <td>{{ cita.doctor_id }}</td>
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
  name: "TablaInfoCitas",
  data() {
    return {
      citas: [],
      pacientes: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/appointments").then((response) => {
      this.citas = response.data;
    });
    axios.get("http://localhost:3000/pacientes").then((response) => {
      this.pacientes = response.data;
    });
  },
  computed: {
    filterByPatient() {
      const filteredPatient = this.pacientes.filter(
        (paciente) => this.citas.map((cita) => cita.patient_id) === paciente.id
      );

      console.log(filteredPatient);
      return filteredPatient;
    },
  },
};
</script>
