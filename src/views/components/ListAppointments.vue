<template>
  <v-card class="list">
    <v-card-title class="headline">Citas</v-card-title>
    <v-card-text>
      <v-list-item
        v-for="quote in filterQuotesByUser()"
        :key="quote.id"
        class="list-item"
      >
        <v-list-item-content>
          <v-list-item-title>{{ quote.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ quote.date }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="red" @click="confirmDelete(quote.id)">Eliminar</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<style>
.list {
  width: 80%;
  margin-top: 18%;
  margin-right: 50px;
  max-height: 52vh;
  overflow-y: auto;
  background-color: aliceblue;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      quotes: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/appointments").then((response) => {
      this.quotes = response.data;
    });
  },
  methods: {
    filterQuotesByUser() {
      const session = JSON.parse(localStorage.getItem("user"));
      return (this.quotes = this.quotes.filter(
        (quote) => quote.user_id === session.id
      ));
    },

    confirmDelete(id) {
      if (window.confirm("¿Está seguro que desea eliminar esta cita?")) {
        this.deleteQuote(id);
      }
    },
    deleteQuote(id) {
      axios
        .delete(`http://localhost:3000/appointments/${id}`)
        .then(() => {
          this.quotes = this.quotes.filter((quote) => quote.id !== id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
