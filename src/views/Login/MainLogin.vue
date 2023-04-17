<template>
  <div class="container">
    <div class="form-container">
      <h1>Login</h1>
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

      <button class="sign-up-button mb-3" @click="login">Login</button>

      <div class="login-text">
        Don't have an account?
        <router-link to="/signup" class="login-link">Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ADMIN, DOCTOR } from "@/constants/Role.js";
import "./style.css";

export default {
  data() {
    return {
      email: "",
      password: "",
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
  methods: {
    async login() {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const user = users.find(
        (user) => user.email === this.email && user.password === this.password
      );
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role === ADMIN) {
          this.$router.push("/admin");
        } else if (user.role === DOCTOR) {
          this.$router.push("/doctor");
        } else {
          this.$router.push("/home");
        }
      } else {
        alert("Invalid email or password");
      }
    },
  },
};
</script>
