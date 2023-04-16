<template>
  <nav class="navbar">
    <button v-if="username" class="navbar-logout-btn" @click="logout">
      Logout
    </button>
  </nav>
</template>

<style>
.navbar {
  background-color: #1d63a8;
  color: white;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px;
}

.navbar-brand {
  font-size: 24px;
  font-weight: bold;
}

.navbar-logout-btn {
  background-color: white;
  color: #333;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
}
</style>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("user"),
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      window.location.href = "/login";
    },
  },
};
</script>
