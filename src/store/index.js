
import { createStore } from 'vuex'
const store = createStore({
  state () {
    isCollapse:true
  },
  mutations: {
   toggleisCollapse(state,payload) {
    state.isCollapse = !state.isCollapse

   }
  }
})

export default store
