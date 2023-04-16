<template>
  <div class="form-container">
    <h2>Login</h2>
    <p>
      <input
        type="email"
        class="input-field"
        placeholder="email"
        v-model="email"
      />
    </p>
    <p>
      <input
        type="password"
        class="input-field"
        placeholder="Password"
        v-model="password"
      />
    </p>

    <p>
      Don't have an account?
      <router-link to="/signup" class="login-link">Sign up</router-link>
    </p>
  </div>
  <div class="button-container">
    <button class="sign-up-button" @click="login">Login</button>
  </div>
</template>

<style>
.form-container {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
}

.input-field {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.button-container {
  text-align: center;
}

.sign-up-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sign-up-button:hover {
  background-color: #0062cc;
}

.login-link {
  color: #007bff;
  text-decoration: none;
}
</style>

<script>
import { ADMIN } from "@/constants/Role.js";

export default {
  data() {
    return {
      email: "",
      password: "",
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
