<template>
  <div>
    <div class="w-full">
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="submit" @click="togglePause" class="text-sm font-semibold "
                :class="[socket.paused ?
                'inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2   text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                :
                 '  leading-6 text-gray-900'
                 ]"
        >{{ socket.paused ? 'Unpause' : 'Pause' }}
        </button>
        <button type="submit" @click="click(null)"
                class="text-sm font-semibold inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2   text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          State
        </button>
        <template v-for="(panel,index) in Object.keys(socket.debugText)">
          <button type="button" @click="click(panel)" :key="index" class="text-sm font-semibold leading-6 text-gray-900">{{ panel }}</button>
        </template>
      </div>
    </div>
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
  components: {
    'debug-xss': () => import('./xss'),
    'debug-state': () => import('./state'),
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


