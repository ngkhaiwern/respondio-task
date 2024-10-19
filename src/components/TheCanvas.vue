<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import data from '@/assets/data/data.json'

const { addNodes, fitView, onInit } = useVueFlow()

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
  // `instance` is the same type as the return of `useVueFlow` (VueFlowStore)

  addNodes({
    id: '123123',
    position: { x: 0, y: 0 },
    data: {
      label: 'test composable',
    },
  })

  fitView()
})
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges"> </VueFlow>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>
