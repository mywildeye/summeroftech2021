<template>
  <div class="border border-solid p-3 rounded-md bg-gray-100 shadow-lg ">
    <div class="font-bold text-center">{{ site.name }}</div>
    <div class="text-xs flex flex-col text-center shadow-inner shadow-lg bg-gray-200 rounded p-1">
      <div class="">Last Connection</div>
    <div>{{lastConnection.toFormat("yyyy-MM-dd HH:mm:ss a")}}</div>
      </div>
    <div class="flex flex-col">
      <div v-for="input in inputs" :key="input.id" class="flex justify-between mt-2">
<!--        InputLine is a component which is defined in components/InputLine.vue-->
        <InputLine :input="input"></InputLine>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRefs} from 'vue';
import {Site} from "../model/site";
import InputLine from "./InputLine.vue";
import {DateTime} from 'luxon'

export default defineComponent({
  name: 'SiteBlock',
  components: {InputLine},
  props: {
    site: {
      type: Object as PropType<Site>
    }
  },
  setup(props) {
    const {site} = toRefs(props)
    const inputs = computed(() =>
        site.value.inputs.filter(i => i.name.startsWith('Air Temp')
            || i.name.startsWith('Wat')
            || i.name.startsWith('Rela')))
    return {
      site,
      inputs,
      lastConnection : computed(() => DateTime.fromISO(site.value.lastTelemetry))
    }
  }

})
</script>

<style scoped>

</style>
