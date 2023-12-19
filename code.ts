
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
// figma.showUI(__html__);

// figma.ui.onmessage = msg => {
//   if (msg.type === 'create-designs') {
//     const nodes: SceneNode[] = [];

//     for (let i = 0; i < msg.count; i++) {
//       let designNode;

//       switch (msg.designType) {
//         case 'ellipse':
//           designNode = figma.createEllipse();
//           break;
//         case 'rectangle':
//           designNode = figma.createRectangle();
//           break;
//         case 'frame':
//           designNode = figma.createFrame();
//           break;
//         case 'embed':
//           // Add logic for embedding here, e.g., figma.createEmbed
//           break;
//         default:
//           // Default to creating a rectangle if design type is not recognized
//           designNode = figma.createRectangle();
//       }

//       console.log(`Design Type: ${msg.designType}, Design Node: ${designNode}`);

//       if (designNode) {
//         designNode.x = i * 150;
//         designNode.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
//         figma.currentPage.appendChild(designNode);
//         nodes.push(designNode);
//       }
//     }

//     figma.currentPage.selection = nodes;
//     figma.viewport.scrollAndZoomIntoView(nodes);
//   }
//   figma.closePlugin();
// };

figma.showUI(__html__,{ width: 400, height: 400 });

figma.ui.onmessage = msg => {
  if (msg.type === 'show-frame-details') {
    const selectedFrame = figma.currentPage.selection[0];

    if (selectedFrame && selectedFrame.type === 'FRAME') {
      const frameDetails = {
        name: selectedFrame.name,
        width: selectedFrame.width,
        height: selectedFrame.height,
        children: selectedFrame.children.map(child => ({ name: child.name, type: child.type })),
      };

      // Send frame details to the UI
      figma.ui.postMessage({ type: 'update-frame-details', frameDetails });
    }
  }

  if (msg.type === 'edit-frame') {
    const selectedFrame = figma.currentPage.selection[0];

    if (selectedFrame && selectedFrame.type === 'FRAME') {
      // Show the properties panel for the selected frame
      figma.viewport.scrollAndZoomIntoView([selectedFrame]);
      figma.currentPage.selection = [selectedFrame];
    }
  }

  if (msg.type === 'duplicate-frame') {
    const selectedFrame = figma.currentPage.selection[0];

    if (selectedFrame && selectedFrame.type === 'FRAME') {
      // Duplicate the selected frame and its children
      const duplicatedFrame = duplicateFrameWithChildren(selectedFrame);

      figma.currentPage.appendChild(duplicatedFrame);
      figma.currentPage.selection = [duplicatedFrame];
    }
  }

  if (msg.type === 'duplicate-child') {
    const selectedFrame = figma.currentPage.selection[0];

    if (selectedFrame && selectedFrame.type === 'FRAME') {
      const childToDuplicate = selectedFrame.children.find(child => child.name === msg.childName);

      if (childToDuplicate) {
        const duplicatedChild = childToDuplicate.clone();
        selectedFrame.appendChild(duplicatedChild);
      }
    }
  }
  

  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

function duplicateFrameWithChildren(frame:any) {
  // Duplicate the frame
  const duplicatedFrame = frame.clone();
  duplicatedFrame.x += frame.width + 100; // Adjust the x position for the duplicated frame
  duplicatedFrame.y += frame.height + 100; // Adjust the y position for the duplicated frame

  // Clear existing children in the duplicated frame
  duplicatedFrame.children = [];

  // Duplicate and append children to the duplicated frame
  frame.children.forEach((child: { clone: () => any; }) => {
    const duplicatedChild = child.clone();
    duplicatedFrame.appendChild(duplicatedChild);
  });

  return duplicatedFrame;
}


// async function customizeDuplicatedFrame(duplicatedFrame: FrameNode) {
//     await figma.loadFontAsync({ family: "Inter", style: "Regular" });

//     const textNode = figma.createText();
//     textNode.characters = 'Hello, Figma!';
//     textNode.x = 20;
//     textNode.y = 20;

//     const rectangleNode = figma.createRectangle();
//     rectangleNode.resize(100, 100);
//     rectangleNode.x = 20;
//     rectangleNode.y = 100;
//     rectangleNode.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 1 } }];

//     duplicatedFrame.appendChild(textNode);
//     duplicatedFrame.appendChild(rectangleNode);
//   }
  