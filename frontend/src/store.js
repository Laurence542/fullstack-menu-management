// store.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    menus: [],
    menuItems: []
  },
  mutations: {
    SET_MENUS(state, menus) {
      state.menus = menus;
    },
    ADD_MENU(state, menu) {
      state.menus.push(menu);
    },
    SET_MENU_ITEMS(state, menuItems) {
      state.menuItems = menuItems;
    },
    ADD_MENU_ITEM(state, menuItem) {
      state.menuItems.push(menuItem);
    },
    REMOVE_MENU_ITEM(state, menuItemId) {
      state.menuItems = state.menuItems.filter(item => item.id !== menuItemId);
    },
    UPDATE_MENU_ITEM(state, updatedMenuItem) {
      const index = state.menuItems.findIndex(item => item.id === updatedMenuItem.id);
      if (index !== -1) {
        state.menuItems.splice(index, 1, updatedMenuItem);
      }
    }
  },
  actions: {
    fetchMenus({ commit }) {
      return axios.get('http://localhost:8000/api/menus/')
        .then(response => {
          commit('SET_MENUS', response.data);
        })
        .catch(error => {
          console.error('Error fetching menus:', error);
        });
    },
    addMenu({ commit }, menuData) {
      return axios.post('http://localhost:8000/api/menus/', menuData)
        .then(response => {
          commit('ADD_MENU', response.data);
        })
        .catch(error => {
          console.error('Error adding menu:', error);
        });
    },
    fetchMenuItems({ commit }) {
      return axios.get('http://localhost:8000/api/menu-items/')
        .then(response => {
          commit('SET_MENU_ITEMS', response.data);
        })
        .catch(error => {
          console.error('Error fetching menu items:', error);
        });
    },
    addMenuItem({ commit }, menuItemData) {
      return axios.post('http://localhost:8000/api/menu-items/', menuItemData)
        .then(response => {
          commit('ADD_MENU_ITEM', response.data);
        })
        .catch(error => {
          console.error('Error adding menu item:', error);
        });
    },
    updateMenuItem({ commit }, { id, data }) {
      return axios.put(`http://localhost:8000/api/menu-items/${id}/`, data)
        .then(response => {
          commit('UPDATE_MENU_ITEM', response.data);
        })
        .catch(error => {
          console.error('Error updating menu item:', error);
        });
    },
    deleteMenuItem({ commit }, menuItemId) {
      return axios.delete(`http://localhost:8000/api/menu-items/${menuItemId}/`)
        .then(() => {
          commit('REMOVE_MENU_ITEM', menuItemId);
        })
        .catch(error => {
          console.error('Error deleting menu item:', error);
        });
    }
  }
});
