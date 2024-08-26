<template>
  <div>
    <h1>{{ menu.name }}</h1>
    <!-- Display menu items here -->
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      menu: {}
    };
  },
  created() {
    axios.get(`menus/${this.$route.params.id}/`)
      .then(response => {
        this.menu = response.data;
      });
  }
};
</script>
