<template>
  <div>
    <h2>Add New Menu</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Menu Name:</label>
        <input type="text" v-model="menuName" required />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuName: ''
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch('addMenu', { name: this.menuName });
      this.menuName = '';  // Clear the form
    }
  }
};
</script>
