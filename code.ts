
// figma.showUI(__html__);

// figma.ui.onmessage = msg => {
//   if (msg.type === 'create-rectangles') {
//     const nodes: SceneNode[] = [];
//     for (let i = 0; i < msg.count; i++) {
//       const rect = figma.createRectangle();
//       rect.x = i * 150;
//       rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
//       figma.currentPage.appendChild(rect);
//       nodes.push(rect);
//     }
//     figma.currentPage.selection = nodes;
//     figma.viewport.scrollAndZoomIntoView(nodes);
//   }
//   figma.closePlugin();
// };
figma.showUI(__html__);

figma.ui.onmessage = msg => {
  if (msg.type === 'create-designs') {
    const nodes: SceneNode[] = [];

    for (let i = 0; i < msg.count; i++) {
      let designNode;

      switch (msg.designType) {
        case 'ellipse':
          designNode = figma.createEllipse();
          break;
        case 'rectangle':
          designNode = figma.createRectangle();
          break;
        case 'frame':
          designNode = figma.createFrame();
          break;
        case 'embed':
          // Add logic for embedding here, e.g., figma.createEmbed
          break;
        default:
          // Default to creating a rectangle if design type is not recognized
          designNode = figma.createRectangle();
      }

      console.log(`Design Type: ${msg.designType}, Design Node: ${designNode}`);

      if (designNode) {
        designNode.x = i * 150;
        designNode.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
        figma.currentPage.appendChild(designNode);
        nodes.push(designNode);
      }
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  figma.closePlugin();
};
