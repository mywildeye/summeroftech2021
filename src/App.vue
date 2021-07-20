<template>
  <div class="fixed h-2/4 w-2/4 mx-auto inset-0 my-auto border border-solid shadow-2xl rounded-lg p-4 bg-gradient-to-r from-green-400 to-blue-500">
    <div class="flex flex-col">
      <div class="flex">
        <div v-for="site in wildeye.sites" class="border border-solid p-3 rounded-md bg-gray-100 shadow-lg">
          <div class="font-bold text-center">{{site.name}}</div>
          <div class="flex flex-col">
          <div v-for="input in site.inputs.filter(i => i.name.startsWith('Air Temp'))" class="flex">
            <div class="text-xs mr-2 align-baseline self-center">{{input.name}}</div>
            <div class="bg-blue-500 p-1 rounded-full">
            <div class="text-xs font-bold text-white" >{{Math.round(input.timeseries.slice(-1)[0]?.value*10)/10}}</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive} from 'vue'
import {query} from "./services/wildeye";
import {Site} from "./model/site";

interface Wildeye {
  sites: Site[]
}

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const wildeye = reactive<Wildeye>({sites:[]})
    onMounted(async () => {
      const data = await query('op51065', new Date())
      wildeye.sites.push(data)
    });
    return{
      wildeye
    }
  }
})
</script>

<style>
</style>
