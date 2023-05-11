<template>
  <form class="w-full" @submit.prevent="submit">
    <div class="space-y-12 sm:space-y-16">
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">Connection</h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">Please start by connecting to a host.</p>

        <div
          class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="address" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Address</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input type="text" name="address" id="address" autocomplete="given-name"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                     v-model="socket.address" :readonly="connecting" :disabled="connecting">
              <error-msg v-if="socket.error" :msg="socket.error"></error-msg>
            </div>
          </div>

          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Username</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input type="text" name="username" id="username" autocomplete="family-name"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                     v-model="socket.username" :readonly="connecting" :disabled="connecting">
            </div>
          </div>
          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="secret" class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Secret</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <input type="password" name="secret" id="secret" autocomplete="family-name"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                     v-model="socket.secret" :readonly="connecting" :disabled="connecting">
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="submit" v-if="connecting" class="text-sm font-semibold leading-6 text-gray-900 border-indigo-600 border-2 rounded-md p-2 hover:bg-indigo-500">Disconnect</button>
      <button type="submit" v-if="!connecting"
              class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Connect
      </button>
    </div>
  </form>

</template>
<script>
"use strict"
import {argv} from "@/helpers/utils"
import Socket from "@/components/mixins/Socket";

export default {
  name: 'app-connect',
  data: function () {
    return {};
  },
  mixins: [Socket],
  computed: {
    connecting: function () {
      return this.socket.socket != null;
    }
  },
  methods: {
    submit: function () {
      if (this.connecting) {
        this.socket.disconnect();
      } else {
        this.socket.connect();
      }
    },
  },
  mounted: function () {
    let args = argv();
    if ('address' in args) {
      this.socket.address = args.address;
    }
    if ('username' in args) {
      this.socket.username = args.username;
    }
    if ('secret' in args) {
      this.socket.secret = args.secret;
    }
  },
}
</script>

