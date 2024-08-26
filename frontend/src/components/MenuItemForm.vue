<template>
  <div>
    <h1>Add Menu Item</h1>
    <form @submit.prevent="addMenuItem">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="menu">Menu:</label>
        <select v-model="menuId" required>
          <option v-for="menu in menus" :key="menu.id" :value="menu.id">{{ menu.name }}</option>
        </select>
      </div>
      <div>
        <label for="parent">Parent:</label>
        <select v-model="parentId">
          <option value="">None</option>
          <option v-for="item in menuItems" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
      </div>
      <button type="submit">Add Menu Item</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      name: '',
      menuId: '',
      parentId: ''
    };
  },
  computed: {
    ...mapState(['menus', 'menuItems']),
  },
  created() {
    this.$store.dispatch('fetchMenus');
    this.$store.dispatch('fetchMenuItems');
  },
  methods: {
    addMenuItem() {
      const menuItemData = {
        name: this.name,
        menu: this.menuId,
        parent: this.parentId || null
      };
      this.$store.dispatch('addMenuItem', menuItemData)
        .then(() => {
          this.name = '';
          this.menuId = '';
          this.parentId = '';
          alert('Menu item added successfully!');
        })
        .catch(error => {
          console.error('Error adding menu item:', error);
        });
    }
  }
};
</script>
