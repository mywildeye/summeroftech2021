<template>

  <!-- Styling is done using Tailwindcss -->
  <!-- see https://tailwindcss.com/ -->

  <div class="fixed w-full h-full sm:h-3/4 sm:w-3/4 mx-auto inset-0 my-auto border border-solid shadow-2xl rounded-lg p-4 bg-gradient-to-r from-green-400 to-blue-500">
    <div class="flex flex-col">
      <div class="flex justify-evenly flex-col sm:flex-row ">
        <div v-for="site in wildeye.sites" :key="site.id" class="mt-4 ">
          <!-- SiteBlock is a component which is defined in components/SiteBlock.vue-->
          <!-- It takes a "prop" called site.  -->
          <!-- It binds the site object using the vue shorthand : which is the same as v-bind -->
          <!-- see https://v3.vuejs.org/api/directives.html#v-bind  -->
          <SiteBlock :site="site"></SiteBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue'
import {query} from "./services/wildeye";
import {Site} from "./model/site";
import SiteBlock from "./components/SiteBlock.vue"
import {DateTime} from "luxon";

interface Wildeye {
  sites: Site[]
}

export default defineComponent({
  name: 'App',
  components: {SiteBlock},
  setup() {
    const wildeye = reactive<Wildeye>({sites: []})
    const since = ref<DateTime>(DateTime.now().minus({day:2}))
    onMounted(async () => {
      // add the sites initially...
      for (const d of ['op51065', 'op51025', 'op53831']) {
        wildeye.sites.push(await query(d, since.value));
      }
      setInterval(async () => {
        // every 30 seconds update the sites...
        for(let d of wildeye.sites){
          Object.assign(d, await query(d.deviceId, since.value))
        }
      }, 30000)
    });
    return {
      wildeye
    }
  }
})
</script>

<style>
</style>
