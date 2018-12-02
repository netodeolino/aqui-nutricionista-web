<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view/>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.btn-primary {
  color: #008f00 !important;
  background-color: #88f188 !important;
  border-color: #008f00 !important;
}
a {
  color: #008f00 !important;
}
a:hover {
  color: #88f188 !important;
}
.home {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
