import type 
{ TreeNode } from "../types/tree";

export const updateNode = (
  nodes: TreeNode[],
  id: string,
  updater: (node: TreeNode) => TreeNode
): TreeNode[] =>
  nodes.map((n) =>
    n.id === id
      ? updater(n)
      : {
          ...n,
          children: n.children
            ? updateNode(n.children, id, updater)
            : n.children,
        }
  );

export const removeNode = (nodes: TreeNode[], id: string): TreeNode[] =>
  nodes
    .filter((n) => n.id !== id)
    .map((n) => ({
      ...n,
      children: n.children ? removeNode(n.children, id) : n.children,
    }));
