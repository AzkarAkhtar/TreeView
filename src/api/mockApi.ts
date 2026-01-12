import type { TreeNode } from "../types/tree";

export const fetchChildren = (parentId: string): Promise<TreeNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: `${parentId}-1`,
          name: "Lazy Child 1",
          hasChildren: true,
        },
        {
          id: `${parentId}-2`,
          name: "Lazy Child 2",
        },
      ]);
    }, 800);
  });
};
