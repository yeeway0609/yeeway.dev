import { visit } from 'unist-util-visit'

// TODO: 給定預設的 class name 例如 .grid .gap-4 .place-items-center .grid-cols-xxx
/**
 * :::image-gallery{#123 .grid .grid-cols-2}
 * xxx
 * :::
 * 會變成 <div id="123" class="grid grid-cols-2">xxx</div>
 */
export default function remarkImageGallery() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && node.name === 'image-gallery') {
        const data = node.data || (node.data = {})
        data.hName = 'div'
        data.hProperties = node.attributes || {}
      }
    })
  }
}
