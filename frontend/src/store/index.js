import Vue from 'vue';
import Vuex from 'vuex';
import apiClient from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menus: [],
    },
    mutations: {
        SET_MENUS(state, menus) {
            state.menus = menus;
        }
    },
    actions: {
        fetchMenus({ commit }) {
            apiClient.get('/menus/')
                .then(response => {
                    commit('SET_MENUS', response.data);
                })
                .catch(error => {
                    console.log('Error fetching menus:', error);
                });
        },
        addMenuItem({ dispatch }, payload) {
            apiClient.post('/menu-items/', payload)
                .then(() => {
                    dispatch('fetchMenus');
                })
                .catch(error => {
                    console.log('Error adding menu item:', error);
                });
        },
        updateMenuItem({ dispatch }, { id, payload }) {
            apiClient.put(`/menu-items/${id}/`, payload)
                .then(() => {
                    dispatch('fetchMenus');
                })
                .catch(error => {
                    console.log('Error updating menu item:', error);
                });
        },
        deleteMenuItem({ dispatch }, id) {
            apiClient.delete(`/menu-items/${id}/`)
                .then(() => {
                    dispatch('fetchMenus');
                })
                .catch(error => {
                    console.log('Error deleting menu item:', error);
                });
        }
    },
    getters: {
        getMenuById: (state) => (id) => {
            return state.menus.find(menu => menu.id === id);
        }
    }
});
