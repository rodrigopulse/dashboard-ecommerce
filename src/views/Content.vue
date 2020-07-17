<template>
  <div class="container-fluid p-0">
    <Header />
    <div class="content">
      <router-view name="content"/>
    </div>
  </div>
</template>
<script>
import Header from '../components/Header'

export default {
  components: {
    Header
  }
}
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  max-width: 1050px;
  width: 100%;
  padding: 40px 0;
  margin: 76px auto 0 auto;
  background: #fff;
}
</style>