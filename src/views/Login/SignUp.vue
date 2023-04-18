<template>
  <div class="container">
    <div class="form-container">
      <h1>Sign Up</h1>
      <div>
        <v-text-field
          label="Email"
          v-model="email"
          hide-details="auto"
          :rules="[rules.required, rules.validateEmail]"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </div>
      <v-select
        v-model="select"
        :items="items"
        item-title="text"
        item-value="value"
        label="Especialidad"
        persistent-hint
        return-object
        single-line
      ></v-select>

      <button v-on:click="signUp" class="sign-up-button mb-3">Sign Up</button>

      <div>
        Already have an account?
        <router-link to="/login" class="login-link">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "./style.css";
import { PATIENT } from "@/constants/Role";

export default {
  name: "SignUp",
  data() {
    return {
      role: "",
      email: "",
      password: "",
      select: { text: "Paciente", value: 0 },
      items: [
        { text: "Paciente", value: 0 },
        { text: "Doctor", value: 1 },
      ],
      show1: false,
      show2: true,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
        validateEmail: (value) =>
          /.+@.+\..+/.test(value) || "E-mail must be valid",
      },
    };
  },

  mounted() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    async signUp() {
      await axios
        .post("http://localhost:3000/users", {
          email: this.email,
          password: this.password,
          role: this.select.value,
        })
        .then(() => {
          alert("Usuario registrado correctamente");
          if (this.select.value === PATIENT) {
            this.$router.push("/profile");
          } else {
            this.$router.push("/profile-doctor");
          }
        })

        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
