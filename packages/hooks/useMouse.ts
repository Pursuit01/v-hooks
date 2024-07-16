import {ref, type Ref} from "vue"

type MouseOption = {}
type UseMouseReturn = {
  x: Ref<number>
  y: Ref<number>
}

export const useMouse = (option: MouseOption): UseMouseReturn => {
  const x = ref<number>(0)
  const y = ref<number>(0)
  return {
    x,
    y
  }
}
