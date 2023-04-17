<template>
  <v-card>
    <ToolBar />
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="doctores">Doctores</v-tab>
      <v-tab value="pacientes">Pacientes</v-tab>
      <v-tab value="citas">Citas</v-tab>
      <v-tab value="especialidades">Especialidades</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="doctores">
          <TablaInfoDoctores />
        </v-window-item>

        <v-window-item value="pacientes">
          <TablaInfoPacientes />
        </v-window-item>

        <v-window-item value="citas">
          <TablaInfoCitas />
        </v-window-item>

        <v-window-item value="especialidades">
          <TablaInfoEspecialidades />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>


<script>
import TablaInfoDoctores from "../Home/components/TablaInfoDoctores.vue";
import TablaInfoPacientes from "../Home/components/TablaInfoPacientes.vue";
import TablaInfoCitas from "../Home/components/TablaInfoCitas.vue";
import TablaInfoEspecialidades from "../Home/components/TablaInfoEspecialidades.vue";
import ToolBar from "@/layouts/ToolBar.vue";

export default {
  data: () => ({
    tab: null,
  }),
  components: { TablaInfoDoctores, TablaInfoPacientes, TablaInfoCitas, TablaInfoEspecialidades, ToolBar},
};
</script>



