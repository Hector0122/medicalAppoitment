<template>
  <div>
    <h1>Admin Page</h1>
    <p>Welcome, {{ user.username }}!</p>
    <p>You have admin privileges.</p>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'));
    }
  }
}
</script>
