import actions from './actions';
import mutations from './mutations';
import state from './modules/index';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
})




