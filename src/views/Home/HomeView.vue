<template>
  <v-layout>
    <v-col cols="12">
      <div>
        <tool-bar />
      </div>
      <div class="d-flex justify-center">
        <card-component />
      </div>
      <div>
        <v-row>
          <v-col>
            <calendar-component />
          </v-col>
          <v-col cols="4">
            <list-appointments />
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-layout>
</template>

<script setup>
import CardComponent from "@/views/Home/components/CardComponent.vue";
import CalendarComponent from "@/views/components/CalendarComponent.vue";
import ListAppointments from "@/views/components/ListAppointments.vue";
import ToolBar from "@/layouts/ToolBar.vue";
</script>
