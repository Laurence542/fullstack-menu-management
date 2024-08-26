<template>
  <div>
    <h1>Menu Item List</h1>
    <ul>
      <li v-for="item in menuItems" :key="item.id">
        {{ item.name }} - <router-link :to="'/menu-item/' + item.id">View Details</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: []
    };
  },
  created() {
    this.$store.dispatch('fetchMenuItems');
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'SET_MENU_ITEMS') {
        this.menuItems = mutation.payload;
      }
    });
  }
};
</script>
