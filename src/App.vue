
<template>
  <md-app md-mode="reveal">
    <md-app-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">OES</span>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible">
      <md-toolbar class="md-transparent" md-elevation="0"></md-toolbar>
      <SideNav></SideNav>
    </md-app-drawer>

    <md-app-content>
      <router-view></router-view>
    </md-app-content>
  </md-app>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.md-app {
  height: 100vh;
}
.md-drawer {
  max-width: 250px;
}
</style>

<script>
export default {
  name: "App",
  data: () => ({
    menuVisible: false
  })
};
</script>