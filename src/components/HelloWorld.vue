<template>
  <div class="hello">
    <h1>Maze generated</h1>
    <h2>Width: {{this.$store.state.rows}} || Height: {{this.$store.state.columns}}</h2>
    <el-button @click="onHome()">Back Home</el-button>
  </div>
</template>

<script>
import p5 from "p5";
import { mapGetters } from 'vuex'
import router from '../router/index'


export default {
  name: "HelloWorld",
  mounted() {
    let cw = this.$store.state.cellWidth;
    var columns, rows;
    let grid = [];
    let currentCell;
    let stack = [];
    let width = this.$store.state.rows;
    let height = this.$store.state.columns;
    let startP = this.$store.state.startPoint;

    
    const script = function(p5) { 
      p5.setup = () => {
        p5.createCanvas(width, height);
        columns = p5.floor(p5.width / cw);
        rows = p5.floor(p5.height / cw);

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < columns; x++) {
            let cell = new Cell(x, y);
            grid.push(cell);
          }
        }

        if(startP === 0) {
          currentCell = grid[0];
        } else if(startP === 1) {
          currentCell = grid[p5.round((grid.length - 1)/2)];
        } else if(startP === 2) {
          currentCell = grid[p5.round(grid.length - 1)];
        }
      };
      p5.draw = () => {
        p5.background(51);
        for (let index = 0; index < grid.length; index++) {
          grid[index].show();
        }
        currentCell.visited = true;
        currentCell.highlight();
        //STEP 1
        let nextCell = currentCell.checkNeighbours();
        if (nextCell) {
          nextCell.visited = true;
          //STEP 2
          stack.push(currentCell);
          //STEP 3
          removeWalls(currentCell, nextCell);
          //STEP 4
          currentCell = nextCell;
        } else if (stack.length > 0) {
          //STEP 1
          let cell = stack.pop();

          //STEP 2
          currentCell = cell;
        }
      };
      function getIndex(x, y) {
        if (x < 0 || y < 0 || x > columns - 1 || y > rows - 1) {
          return -1;
        } else {
          return x + y * columns;
        }
      }

      function Cell(i, j) {
        this.i = i;
        this.j = j;
        this.visited = false;
        this.walls = [true, true, true, true]; // T R B L

        this.checkNeighbours = function() {
          let neighbours = [];

          let top = grid[getIndex(i, j - 1)];
          let right = grid[getIndex(i + 1, j)];
          let bottom = grid[getIndex(i, j + 1)];
          let left = grid[getIndex(i - 1, j)];

          // if(top && !top.visited) {
          //     neighbours.push(top);
          // }
          // if(right && !right.visited) {
          //     neighbours.push(right);
          // }
          // if(bottom && !bottom.visited) {
          //     neighbours.push(bottom);
          // }
          // if(left && !left.visited) {
          //     neighbours.push(left);
          // }
          [top, right, bottom, left].forEach((element) => {
            if (element && !element.visited) {
              neighbours.push(element);
            }
          });

          if (neighbours.length > 0) {
            let randomN = p5.floor(p5.random(0, neighbours.length));
            return neighbours[randomN];
          } else {
            return undefined;
          }
        };

        this.show = function() {
          let x = this.i * cw;
          let y = this.j * cw;

          p5.stroke(255);
          if (this.walls[0]) {
            p5.line(x, y, x + cw, y);
          }
          if (this.walls[1]) {
            p5.line(x + cw, y, x + cw, y + cw);
          }
          if (this.walls[2]) {
            p5.line(x + cw, y + cw, x, y + cw);
          }
          if (this.walls[3]) {
            p5.line(x, y + cw, x, y);
          }
          if (this.visited) {
            p5.noStroke();
            p5.fill(0, 225, 255, 220);
            p5.rect(x, y, cw, cw);
          }
        };

        this.highlight = function () {
          var x = this.i * cw;
          var y = this.j * cw;

          p5.noStroke();
          p5.fill(155, 0, 255, 220);
          p5.rect(x, y, cw, cw)
        }
      }

      function removeWalls(a, b) {
        let x = a.i - b.i;
        if (x === 1) {
          a.walls[3] = false;
          b.walls[1] = false;
        } else if (x === -1) {
          a.walls[1] = false;
          b.walls[3] = false;
        }

        let y = a.j - b.j;
        if (y === 1) {
          a.walls[0] = false;
          b.walls[2] = false;
        } else if (y === -1) {
          a.walls[2] = false;
          b.walls[0] = false;
        }
      }
    };
    new p5(script, '.hello');
  },
  methods:{
    onHome: function() {
      router.push({ path: '/' })
      history.go(0);
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'columns',
      'rows',
      // ...
    ])
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
</style>
