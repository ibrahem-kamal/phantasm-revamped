<template>
  <div id="app">
    <header>
      <h1>Phantasm UI</h1>
      <nav v-if="socket.connected()">
        <button v-for="(tab,index) in tabs" :key="index" @click="show(tab.component)" :class="{ active: component == tab.component }">{{ tab.title }}</button>
      </nav>
    </header>
    <keep-alive>
      <component :is="component" :socket.sync="socket" style="overflow: auto"></component>
    </keep-alive>
  </div>
</template>

<script>
import Socket from "@/components/mixins/Socket";
export default {
  name: 'App',
  mixins: [Socket],
  data: function() {
    return {
      component: 'app-connect',
      tabs: Object.freeze([
        { component: 'app-connect', title: 'Connection' },
        // { component: 'app-radar', title: 'Radar' },
        { component: 'app-debugger', title: 'Debugger' },
        { component: null, title: 'Updates' },
        { component: null, title: 'Admin' },
      ]),
    };
  },
  components:{
    'app-connect':() => import('./components/connect'),
    'app-radar':() => import('./components/radar/radar'),
    'app-debugger':() => import('./components/debugger/debugger'),
  },
  methods: {
    show: function(component) {
      if (component) {
        this.component = component;
      }
    },
  },
  watch: {
    socket: {
      role: function(role) {
        // Switch to radar when connecting
        if (role) {
          this.component = 'app-radar';
        }
        else {
          this.component = 'app-connect';
        }
      },
    },
  },
}
</script>
<style>
html, body, #app-container, .app-main {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
h1, h2, h3, h4, h5, h6 {
  padding: 0;
  margin: 0;
}
.app-main {
  display: grid;
  grid-template: 3rem auto / auto;
}

.app-main > header {
  display: flex;
  flex-direction: row;

  border-bottom: 1px solid #888;
}
.app-main > header > h1 {
  line-height: 3rem;
  width: 15rem;
}
.app-main > header > nav {
  display: flex;
  flex-direction: row;

  height: 3rem;
}
.app-main > header > nav > button {
  height: 3rem;
  margin: 0 0.1rem;
  cursor: pointer;

  border: 1px solid #888;
  background-color: white;
}
.app-main > header > nav > button.active {
  border-bottom: none;
}
.app-main > div {
  overflow: auto;
}
</style>

