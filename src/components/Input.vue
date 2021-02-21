<template>
  <div class="hello">
    <label for="">Select Width</label>
      <div class="inputWrapper">
        <el-input v-model="rows" type="number" min="1" max="800"></el-input>
      </div>
    <label for="">Select Height</label>
      <div class="inputWrapper">
        <el-input v-model="cols" type="number" min="1" max="800"></el-input>
      </div>
    <label for="">Select brink density</label>
      <div class="inputWrapper">
        <el-input v-model="cellWidth" type="number" min="1" max="800"></el-input>
      </div>

      <label>Select start point</label>
      <div>
        <el-select v-model="startPoint" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

    <el-button @click="selectDimensions" class="myButton" type="success">Generate maze</el-button>
  </div>

</template>

<script>
import { mapActions } from 'vuex';
import router from '../router/index'

export default {
  name: "Input",
  data: function() {
    return {
      cols: 300,
      rows: 300,
      cellWidth: 30,
       options: [{
          value: 0,
          label: 'Start'
        }, {
          value: 1,
          label: 'Center'
        }, {
          value: 2,
          label: 'End'
        }],
        startPoint: 0,
    };
  },
  methods: {
    ...mapActions([
      'actSetDimensions'
    ]),
    selectDimensions() {
      let elements = {
        columns: this.cols,
        rows: this.rows,
        cellWidth: this.cellWidth,
        startPoint: this.startPoint
      }
      if(elements.columns < 1 || elements.rows < 1  || elements.columns > 900 || elements.rows > 900) {
         alert("Please insert a number >= 1") 
      } else if(elements.cellWidth > elements.rows || elements.cellWidth > elements.columns) {
          alert("The cell width can' t be bigger than the maze width or height");
      } else {
        this.actSetDimensions(elements)
        router.push({ path: 'maze' })
      }
     

    }
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.el-input {
    width: 200px;
}

.myButton {
    margin-top: 15px
}

</style>
