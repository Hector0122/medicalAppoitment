<template>
  <div>
    <MakeAppointment
      v-model="dialog"
      :user_id="userId"
      :fecha_seleccionada="selectedDate"
    />

    <FullCalendar
      class="calendario"
      :options="calendarOptions"
      :height="'auto'"
    />
  </div>
</template>
<style>
.calendario {
  margin-top: 20px;
  margin-left: 50px;
  max-height: 60vh;
  overflow: auto;
}
</style>

<script>
import FullCalendar from "@fullcalendar/vue3";
import MakeAppointment from "@/views/components/ReservarCita.vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

const showDates = async () => {
  try {
    const { data: citas } = await axios.get(
      "http://localhost:3000/appointments"
    );
    const paciente = JSON.parse(localStorage.getItem("user"));
    const citasPaciente = citas.filter((cita) => cita.user_id === paciente?.id);
    const events = citasPaciente.map(({ title, date }) => ({ title, date }));
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default {
  components: {
    FullCalendar,
    MakeAppointment,
  },
  data() {
    return {
      dialog: null,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        events: () => showDates(),
      },
    };
  },

  methods: {
    handleDateClick(arg) {
      this.selectedDate = arg.dateStr;
      this.userId = JSON.parse(localStorage.getItem("user")).id;
      this.dialog = true;
    },
  },
};
</script>
