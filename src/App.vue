<template>
  <div id="app">
    <notifications group="not-aqui-nutricionista" />
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
.theme--light.v-text-field--outline > .v-input__control > .v-input__slot {
  border: 1px solid rgba(0,143,0,0.90) !important;
}
.select {
  margin-top: 15px;
}
.pointer {
  cursor: pointer;
}
</style>
