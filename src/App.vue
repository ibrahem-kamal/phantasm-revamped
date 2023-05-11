<template>
  <div class="bg-white p-6 lg:px-8 min-h-screen">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Phantasm UI</label>
        <select v-if="socket.connected()" id="tabs" name="tabs"
                class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
          <option v-for="(tab,index) in tabs" :key="index" @onChange="show(tab.component)">{{ tab.title }}</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <h1 class="font-bold text-center mb-6 text-lg text-indigo-700">Phantasm UI</h1>
        <nav class="flex space-x-4 justify-center" aria-label="Tabs" v-if="socket.connected()">
          <a href="#" v-for="(tab,index) in tabs" :key="index" @click="show(tab.component)"
             class="text-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium"
             :class="[component === tab.component ?  'bg-indigo-100 text-indigo-700' :'text-gray-500 hover:text-gray-700'  ]"
          >{{ tab.title }}</a>
        </nav>
      </div>
      <keep-alive>
        <div class="flex flex-row p-3 m-3">
          <component :is="component" :socket.sync="socket" style="overflow: auto"></component>
        </div>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Socket from "@/components/mixins/Socket";

export default {
  name: 'App',
  mixins: [Socket],
  data: function () {
    return {
      component: 'app-connect',
      tabs: Object.freeze([
        {component: 'app-connect', title: 'Connection'},
        // { component: 'app-radar', title: 'Radar' },
        {component: 'app-debugger', title: 'Debugger'},
        {component: null, title: 'Updates'},
        {component: null, title: 'Admin'},
      ]),
    };
  },
  components: {
    'app-connect': () => import('./components/connect'),
    'app-radar': () => import('./components/radar'),
    'app-debugger': () => import('./components/debugger'),
  },
  methods: {
    show: function (component) {
      if (component) {
        this.component = component;
      }
    },
  },
  watch: {
    socket: {
      role: function (role) {
        // Switch to radar when connecting
        if (role) {
          this.component = 'app-radar';
        } else {
          this.component = 'app-connect';
        }
      },
    },
  },
}
</script>

