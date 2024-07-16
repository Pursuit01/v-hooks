interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: "id",
  children: "children",
  pid: "pid"
}

const getConfig = (config: Partial<TreeHelperConfig>) =>
  Object.assign({}, DEFAULT_CONFIG, config)

export const listToTree = <T = any>(
  list: any[],
  config: Partial<TreeHelperConfig> = {}
): T[] => {
  const conf = getConfig(config) as TreeHelperConfig
  const nodeMap = new Map()
  const result: T[] = []
  const {id, children, pid} = conf

  for (const node of list) {
    node[children] = node[children] || []
    nodeMap.set(node[id], node)
  }
  for (const node of list) {
    const parent = nodeMap.get(node[pid])
    ;(parent ? parent.children : result).push(node)
  }
  return result
}

export const treeToList = <T = any>(
  tree: any,
  config: Partial<TreeHelperConfig> = {}
): T => {
  config = getConfig(config)
  const {children} = config
  const result: any = [...tree]
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children!]) continue
    result.splice(i + 1, 0, ...result[i][children!])
  }
  return result
}
