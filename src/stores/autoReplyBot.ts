import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Node, Edge } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'
import data from '@/assets/data/data.json'

export const useAutoReplyBotStore = defineStore('autoReplyBot', () => {
  const { fitView, onInit } = useVueFlow()

  const nodes = ref<Node[]>([])
  const edges = ref<Edge[]>([])

  type CustomData = typeof data

  function convertDataToNodesAndEdges(data: CustomData) {
    const nodes: Node[] = []
    const edges: Edge[] = []

    let currNodes: Node[] = data
      .filter(node => node.parentId === -1)
      .map(node => ({
        id: node.id.toString(),
        type: 'input',
        position: { x: 250, y: 50 },
        data: {
          label: 'initial',
        },
      }))
    nodes.push(currNodes[0])

    while (currNodes.length > 0) {
      currNodes = currNodes.flatMap(currNode => {
        const childNodes = data
          .filter(childNode => childNode.parentId.toString() === currNode.id)
          .map((childNode, index, array) => {
            let positionX
            if (array.length === 1) {
              positionX = currNode.position.x
            } else {
              positionX = 150 + 200 * index
            }
            return {
              id: childNode.id.toString(),
              position: {
                x: positionX,
                y: currNode.position.y + 100,
              },
              data: {
                label: childNode.name,
              },
            }
          })
        childNodes.forEach(childNode => {
          edges.push({
            id: `${currNode.id}->${childNode.id}`,
            type: 'smoothstep',
            source: currNode.id,
            target: childNode.id,
          })
        })
        return childNodes
      })
      nodes.push(...currNodes)
    }
    return {
      nodes,
      edges,
    }
  }

  const convertedData = convertDataToNodesAndEdges(data)
  nodes.value = convertedData.nodes
  edges.value = convertedData.edges

  onInit(() => {
    fitView()
  })

  return { nodes, edges }
})
