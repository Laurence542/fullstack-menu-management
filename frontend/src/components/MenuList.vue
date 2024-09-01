<template>
  <div class="menu-management">
    <!-- Sidebar -->
    <div class="sidebar">
    
      <div class="sidebar-header">
        <img src="/images/svg-gobbler 1.png" alt="Logo" class="logo">
        <img src="/images/menu_open_24dp_FILL0_wght400_GRAD0_opsz24 1.png" alt="Logo" class="nav">
        <img src="/images/menu.png" alt="Logo" class="mobile">
      </div>

      <ul>
        <li>

          <ul>
           <li>
              <a href="#">
                <img src="/images/folder_24dp_FILL1_wght400_GRAD0_opsz24 1.png" alt="Folder Icon" class="icon" />
                <span class="white-text">Systems</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/images/submenu.png" alt="Folder Icon" class="icon" />
                <span class="link-text">System code</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/images/submenu.png" alt="Folder Icon" class="icon" />
                <span class="link-text">Properties</span>
              </a>
            </li>
           <li class="special-item">
              <a href="#">
                <img src="/images/submenu (1).png" alt="Folder Icon" class="icon" />
                <span class="menus-text"><b>Menus</b></span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/images/submenu.png" alt="Folder Icon" class="icon" />
                <span class="link-text">Api list</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
         
         <ul class="below-item">
            <li>
              <a href="#">
                <img src="/images/folder_24dp_FILL0_wght400_GRAD0_opsz24 1.png" alt="Folder Icon" class="icon" />
                <span class="link-text">Users & Group</span>
              </a>
            </li>

            <li>
              <a href="#">
                <img src="/images/folder_24dp_FILL0_wght400_GRAD0_opsz24 1.png" alt="Folder Icon" class="icon" />
                <span class="link-text">Competition</span>
              </a>
            </li>

          </ul>
    
      </div>
      
      
      

    <!-- Main Content -->
    <div class="main-content">
      <!-- Menu List -->
      <div class="menu-list">
        <div class="header">
          <img src="/images/Icon.png" alt="Folder Icon" class="icon" />
          <h3 class="new-text"><span class="slash-text">/ </span> Menus</h3>
          <div class="buttons">
            
          </div>
        </div>

        <div class="header">
          <img src="/images/icon-title.png" alt="Folder Icon" class="headericon" />
          <h2 class="mobile"><span class="slash-text"></span><b>Menus</b></h2>
          <div class="buttons">
            
          </div>
        </div>
        <p>Menu</p>

<div class="input-container">
        <div class="input-wrapper">
            <input type="text" id="system-info" placeholder="System management" disabled>
            <span class="dropdown-icon"></span>
        </div>
    </div>
        
        <ul class="menu-tree">
          <li>
          <div class="buttons">
          <button @click="expandAll" class="expand-button">Expand All</button>
          <button @click="collapseAll" class="collapse-button"><b>Collapse All</b></button>
        </div>

            <ul v-show="isMenuVisible">

              <li v-for="item in hierarchicalMenuItems" :key="item.id">
              {{ item.name }}
              <button @click="editItem(item)">Edit</button>
              <button @click="confirmDelete(item.id)">Delete</button>
              <ul v-if="item.children.length">
                <li v-for="child in item.children" :key="child.id">
                  {{ child.name }}
                  <button @click="editItem(child)">Edit</button>
                  <button @click="confirmDelete(child.id)">Delete</button>
                  <ul v-if="child.children.length">
                    <li v-for="grandchild in child.children" :key="grandchild.id">
                      {{ grandchild.name }}
                      <button @click="editItem(grandchild)">Edit</button>
                      <button @click="confirmDelete(grandchild.id)">Delete</button>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          
            </ul>
          </li>
          <!-- Add more menus here as needed -->
        </ul>
        

        <div v-if="editMenuItem">
      <h2>Edit Menu Item</h2>
      <form @submit.prevent="updateItem">
        <label for="edit-menu">Menu:</label>
        <select v-model="editMenuItem.menu" required>
          <option v-for="menu in menus" :key="menu.id" :value="menu.id">
            {{ menu.name }}
          </option>
        </select>
        <br />

        <label for="edit-name">Item Name:</label>
        <input v-model="editMenuItem.name" type="text" required />
        <br />

        <label for="edit-parent">Parent Item (optional):</label>
        <select v-model="editMenuItem.parent">
          <option value="">None</option>
          <option v-for="item in menuItems" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
        <br />

        <button type="submit">Update Menu Item</button>
      </form>
    </div>


      </div>

      <!-- Menu Details -->
      <div class="menu-details">
        <form @submit.prevent="submitMenuItem">

          <div class="form-group">
            <label>Menu ID</label>
            <input type="text" v-model="menuDetails.menuId" readonly />
          </div>

          <div class="form-group">
            <label>Depth</label>
            <select v-model="newMenuItem.menu" required>
        <option v-for="menu in menus" :key="menu.id" :value="menu.id">
          {{ menu.name }}
        </option>
      </select>
          </div>

          <div class="form-group">
            <label>Parent Data</label>
            <input v-model="newMenuItem.name" type="text" required />
          </div>

          <div class="form-group">
            <label>Name</label>
            <select v-model="newMenuItem.parent">
            <option value="">None</option>
            <option v-for="item in menuItems" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
            </select>
          </div>

          <button type="submit">Save</button>

        </form>
      </div>



    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "MenuList",
  data() {
    return {
      // Data from the first script
      newMenuItem: {
        menu: '',
        name: '',
        parent: ''
      },
      editMenuItem: null, // Holds the item being edited

      // Data from the second script
      isMenuVisible: true,
      menuDetails: {
        menuId: "5c320e9-4ef5-11ed-a7ba-f220af5eda49",
        depth: 3,
        parentData: "Systems",
        name: "SystemCode",
      },
    };
  },
  computed: {
    ...mapState(['menus', 'menuItems']),
    hierarchicalMenuItems() {
      const buildHierarchy = (items) => {
        const itemMap = new Map(items.map(item => [item.id, { ...item, children: [] }]));

        let roots = [];
        itemMap.forEach(item => {
          if (item.parent) {
            const parentItem = itemMap.get(item.parent);
            if (parentItem) {
              parentItem.children.push(item);
            }
          } else {
            roots.push(item);
          }
        });

        return roots;
      };

      return buildHierarchy(this.menuItems);
    }
  },
  methods: {
    // Methods from the first script
    ...mapActions(['fetchMenus', 'fetchMenuItems', 'addMenuItem', 'updateMenuItem', 'deleteMenuItem']),
    submitMenuItem() {
      this.addMenuItem(this.newMenuItem).then(() => {
        this.newMenuItem = { menu: '', name: '', parent: '' };
      });
    },
    editItem(item) {
      this.editMenuItem = { ...item }; // Create a new object to avoid reactivity issues
    },
    updateItem() {
      if (this.editMenuItem) {
        this.updateMenuItem({ id: this.editMenuItem.id, data: this.editMenuItem }).then(() => {
          this.editMenuItem = null; // Clear edit item after updating
        }).catch(error => {
          console.error('Error updating menu item:', error);
        });
      }
    },
    confirmDelete(itemId) {
      if (confirm('Are you sure you want to delete this item?')) {
        console.log(`Attempting to delete item with ID: ${itemId}`);
        this.deleteMenuItem(itemId)
          .then(() => {
            console.log(`Successfully deleted item with ID: ${itemId}`);
            // Refresh the menu items after deletion
            this.fetchMenuItems();
          })
          .catch(error => {
            console.error('Error deleting menu item:', error);
          });
      }
    },

    // Methods from the second script
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    expandAll() {
      this.isMenuVisible = true;
    },
    collapseAll() {
      this.isMenuVisible = false;
    },
    saveDetails() {
      // Save the details logic
      console.log(this.menuDetails);
    },
  },
  created() {
    // Lifecycle hook from the first script
    this.fetchMenus();
    this.fetchMenuItems();
  },
};
</script>


<style scoped>

.menu-management {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
  flex-direction: row; /* Align items in a row for larger screens */
}

/* Sidebar styles */
.sidebar {
  background-color: #101828;
  color: #fff;
  padding: 5px;
  width: 220px;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 15px;
  transition: width 0.3s ease;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 3 10px;
}

.sidebar-header .logo {
  max-width: 80px;
  margin-left: 20px;
  margin-top: 20px;
}

.sidebar-header .nav{
  max-width: 80px;
  cursor: pointer;
  color: #fff;
  margin-right: 20px;
  margin-top: 20px;
}

.sidebar ul {
  padding-top: 84px;
  margin-left: 10px;
  margin-right: 10px;
  list-style-type: none;
  padding: 0;
  background-color: #1D2939;
  border-radius: 15px;
}

.sidebar ul li a {
  color: #fff;
  text-decoration: none;
  display: flex; /* Use flexbox for alignment */
  align-items: center; /* Align items vertically in the center */
  padding: 10px; /* Add some padding */
  font-size: 14px;
  transition: background-color 0.3s ease, padding 0.3s ease;
  
}
.sidebar .below-item{
  background-color:#101828;
  margin: -8px 24px;
}

.sidebar .below-item{
  background-color:#101828;
  margin: -8px 24px;
}

.sidebar .below-item li .link-text{
   color: #667085;
}


.sidebar ul li a img{
 padding-right: 15px
}
.sidebar .sidebar-header .mobile{
  display: none;
}

/* Hover effect */
.sidebar ul li a:hover {
  background-color: #8DCE33; /* Slightly darker shade on hover */
  color: #101828;
  border-radius: 15px;
}

.sidebar ul li .special-item a {
  background-color: #8DCE33; /* Set your desired background color */
  border-radius: 15px;
  color: #101828;
}


.sidebar ul li .link-text{
  color: #667085;
}

.sidebar ul li .white-text{
  color: #FFFFFF;
}

.sidebar ul li .menus-text{
  color: #101828;
  font-size: 14px;
  bold: 700px;
}

.sidebar ul li ul {
  padding-left: 5px;
}

.sidebar ul li ul li a {
  color: #ccc;
}


/* Main content styles */
.main-content {
  flex: 1;
  display: flex;
  padding: 20px;
  background-color: #FFFFFF;
  justify-content: space-between;
  gap: 20px; /* Add space between sections */
  flex-direction: row;
}

/* Menu List styles */
.menu-list {
  flex: 2;
  max-width: 100%;
  padding-left: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header .icon {
  margin-right: -470px; /* Add 5px space between the icon and the h2 */
}

.header .headericon {
  margin-right: -360px; /* Add 5px space between the icon and the h2 */
}

.header h2 {
  font-size: 28px;
  font-weight: 1000;
  color: #333;
  margin: 0; /* Remove default margin to ensure proper alignment */
}

.header h3 {
  font-size: 12px;
  color: #333;
  margin: 0; /* Remove default margin to ensure proper alignment */
}


.header h2 .slash-text{
  color: #D0D5DD;
  
}

.menu-tree .buttons {
  display: flex;
  gap: 10px;
}

.menu-tree .buttons .expand-button{
  background-color: #1D2939;
  color: #fff;
  padding: 9px 20px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 14px;
}

.menu-tree .buttons .collapse-button{
  background-color: #FFFFFF;
  color: #475467;
  padding: 9px 20px;
  border: 2px solid #D0D5DD;
  border-radius: 16px;
  cursor: pointer;
  font-size: 14px;
}


.menu-tree button:hover {
  background-color: #1b56c8;
}

.menu-tree {
  list-style-type: none;
  padding: 0;
}

.menu-tree li {
  cursor: pointer;
  color: #333;
}

.menu-tree li span {
  cursor: pointer;
}

.menu-tree ul {
  padding: 20px 30px;

}

/* Menu Details styles */
.menu-details {
  flex: 1;
  max-width: 500px;
  padding-top: 220px;
  padding-right: 200px;

}

.menu-details h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #475467;
}

.form-group select {
  width: 100%;
  padding: 14px;
  box-sizing: border-box;
  border: 0px solid #ccc;
  border-radius: 16px;
  background-color: #EAECF0;
}

button[type="submit"] {
  background-color: #253BFF;
  color: #fff;
  padding: 15px 120px;
  border: none;
  border-radius: 20px; 
  cursor: pointer;
  font-size: 14px;
}

.input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 320px;
}

.input-wrapper {
    position: relative;
    width: 100%;
}

input[type="text"] {
    width: 100%;
    padding: 10px 40px 10px 10px; /* Add extra padding on the right for the dropdown icon */
    border: 0px solid #F9FAFB;
    border-radius: 8px; /* Rounded corners */
    font-size: 16px;
    outline: none;
    box-sizing: border-box;
    background-color: #F9FAFB;
    color: black; /* Placeholder color */
}

input[type="text"]:disabled {
    background-color: #e9ecef; /* Lighter background for disabled state */
    border-color: #ced4da; /* Change border color to indicate disabled state */
    color: #475467; /* Text color for disabled input */
}

.dropdown-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #6c757d; /* Arrow color */
    pointer-events: none; /* Prevent the icon from interfering with the input */
}


/* Responsive Styles */
@media (max-width: 768px) {
  .menu-management {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    border-radius: 0;
    position: relative;
    transition: width 0.3s ease;
  }

  .main-content {
    margin-top: 0; /* No need for margin on smaller screens */
    flex-direction: column;
  }

  .menu-list, .menu-details {
    max-width: 100%;
  }

  .sidebar ul {
    display: none;
  }

  .sidebar ul.show {
    display: block;
  }
}

@media (max-width: 480px) {
  .sidebar-header .logo {
    max-width: 40px;
  }

  .header h2 {
    font-size: 16px;
  }

  .header button {
    font-size: 12px;
  }

  .form-group input {
    padding: 6px;
  }

  button[type="submit"] {
    font-size: 12px;
    padding: 8px 16px;
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .menu-list {
    padding: 15px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header .icon, .header .headericon {
    max-width: 25px; /* Smaller icons on small screens */
  }

  .header h2 {
    font-size: 1rem; /* Smaller heading size */
  }

  .header h3 {
    font-size: 0.875rem; /* Smaller subheading size */
  }

  .menu-list p {
    font-size: 0.875rem; /* Smaller paragraph text */
  }
}

@media (max-width: 480px) {
  .menu-list {
    padding: 10px;
  }

  .header {
    margin-bottom: 10px;
  }

  .header .icon, .header .headericon {
    max-width: 20px; /* Even smaller icons on extra small screens */
  }

  .header h2 {
    font-size: 0.875rem; /* Further reduced heading size */
  }

  .header h3 {
    font-size: 0.75rem; /* Further reduced subheading size */
  }

  .menu-list p {
    font-size: 0.75rem; /* Further reduced paragraph text */
  }
}
@media (max-width: 768px) {
  .menu-management {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    padding: 10px;
  }

  .main-content {
    padding: 10px;
  }

  .menu-list,
  .menu-details {
    max-width: 100%;
    flex: none;
  }

  .menu-list,
  .menu-details {
    padding: 10px;
  }

  .input-container input[type="text"] {
    font-size: 12px;
    padding: 8px 10px;
  }

  .input-container .dropdown-icon {
    right: 5px;
  }
}

@media (max-width: 480px) {
  .header h2 {
    font-size: 18px;
  }

  .menu-tree .buttons .expand-button,
  .menu-tree .buttons .collapse-button {
    font-size: 12px;
    padding: 7px 20px;
  }

  .form-group input {
    padding: 8px;
  }

  button[type="submit"] {
    font-size: 14px;
    padding: 13px 40px;
  }
}
@media (max-width: 768px) {
  .sidebar {
    width: 60px; /* Shrinks the sidebar on smaller screens */
    background: white;
  }
  .sidebar ul li a .link-text {
    display: none; /* Hides the text, keeping only icons visible */
  }
  .sidebar .sidebar-header .logo{
    display: none;
  }
  .sidebar .sidebar-header .nav{
    display: none;
  }
  .sidebar .sidebar-header .mobile{
    display: block;
  }
  .main-content .header .headericon{
    display: none;
  }
  .main-content .menu-list .header .new-text{
    margin: -11px 0px 5px 30px;
  }
  .main-content .header .mobile{
    display: none;
  }


}
</style>

