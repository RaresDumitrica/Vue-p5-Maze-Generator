<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.png">
    <Input/>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from '@/components/Input.vue'

export default {
  name: 'Home',
  components: {
    Input
  }
}
</script>
