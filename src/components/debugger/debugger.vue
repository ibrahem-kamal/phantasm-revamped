<template>
  <div class="app-debugger">
    <form @submit.prevent="">
      <button v-if="socket.paused" @click="togglePause">Unpause</button>
      <button v-if="!socket.paused" @click="togglePause">Pause</button>
      <button @click="click(null)">State</button>
      <template v-for="(panel,index) in Object.keys(socket.debugText)" >
        <button @click="click(panel)" :key="index">{{ panel }}</button>
      </template>
    </form>
    <debug-state v-if="component === 'debug-state'" :state="socket.state"></debug-state>
    <debug-xss v-if="component === 'debug-xss'" :html="socket.debugText[panel]"></debug-xss>
  </div>
</template>

<script>
"use strict"

import Socket from "@/components/mixins/Socket";

export default {
  data() {
    return {
      component: 'debug-state',
      panel: null,
    };
  },
  mixins: [Socket],
  components:{
    'debug-xss':() => import('./xss'),
    'debug-state':() => import('./state'),
  },
  methods: {
    togglePause() {
      this.socket.paused = !this.socket.paused;
    },
    click(panel) {
      if (panel) {
        this.component = 'debug-xss';
        this.panel = panel;
      } else {
        this.component = 'debug-state';
        this.panel = null;
      }
    },
  },
}
</script>


<style>
.app-debugger {
  display: grid;
  grid-template: auto / 14rem auto;
}

.app-debugger > form {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}
</style>
