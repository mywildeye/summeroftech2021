<template>
  <div class="flex justify-evenly">
    <div class="text-xs mr-2 align-baseline self-center">{{ input.name }}</div>
    <div class="bg-blue-500 p-1 rounded-full mr-2">
      <div class="text-xs font-bold text-white ">
        {{ lastValue }}<span class="text-[0.6rem]">{{ input.unit }}</span>
      </div>
    </div>
    <div class="bg-purple-500 p-1 rounded-full">
      <div class="text-xs font-bold text-white">
        {{ averageValue }}<span class="text-[0.6rem]">{{ input.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRefs} from 'vue';
import {Input} from "../model/site";

const round1dp = v => Math.round(v*10)/10

export default defineComponent({
  name: 'InputLine',
  props: {
    input: {
      type: Object as PropType<Input>
    }
  },
  setup(props) {
    const {input} = toRefs(props)

    // Here we use computed values so that we can process the data and have them dynamically calculated as the
    // underlying values change
    // see https://v3.vuejs.org/guide/reactivity-computed-watchers.html#computed-values

    // take the last value in the timeseries using slices negative lookback
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    const lastValue = computed(() => round1dp(input.value.timeseries.slice(-1)[0]?.value ))

    // calculate the average by taking the sum of the values using reduce then dividing by the count of values
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    const averageValue = computed(() => {
      const sum = input.value.timeseries.reduce((a, c) => a + (c.value), 0);
      return round1dp(sum / input.value.timeseries.length)
    });

    // return all the values you want to make available to the html
    return {
      input,
      lastValue,
      averageValue,
    }
  }

})
</script>

<style scoped>

</style>
