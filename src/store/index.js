import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    columns: 1,
    rows: 1,
    cellWidth: 1,
    startPoint: 0,
  },
  getter: {
    columns: state => {
      return state.columns
    },
    rows: state => {
      return state.rows;
    },
    cellWidth: state => {
      return state.cellWidth
    },
    startPoint: state => {
      return state.startPoint
    }
  },
  mutations: {
    setDimension (state, data) {
      state.columns = data.columns;
      state.rows = data.rows;
      state.cellWidth = data.cellWidth;
      state.startPoint = data.startPoint;
    },
  },
  actions: {
    actSetDimensions (context, payload) {
      context.commit('setDimension', {columns: payload.columns, rows: payload.rows, cellWidth: payload.cellWidth, startPoint: payload.startPoint});
      console.log(payload.cellWidth)
    }
  },
  modules: {
  }
})
