<template>
  <div class="menu-details">
    <h3>Menu Details</h3>
    <form @submit.prevent="saveDetails">
      <div class="form-group">
        <label>Menu ID</label>
        <input type="text" v-model="menuDetails.menuId" readonly />
      </div>
      <div class="form-group">
        <label>Depth</label>
        <input type="number" v-model="menuDetails.depth" />
      </div>
      <div class="form-group">
        <label>Parent Data</label>
        <input type="text" v-model="menuDetails.parentData" readonly />
      </div>
      <div class="form-group">
        <label>Name</label>
        <input type="text" v-model="menuDetails.name" />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "MenuDetails",
  data() {
    return {
      menuDetails: {
        menuId: "5c320e9-4ef5-11ed-a7ba-f220af5eda49",
        depth: 3,
        parentData: "Systems",
        name: "SystemCode",
      },
    };
  },
  methods: {
    saveDetails() {
      // Save the details logic
      console.log(this.menuDetails);
    },
  },
};
</script>

<style scoped>
.menu-details {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  background-color: #2d73f5;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #1b56c8;
}
</style>
