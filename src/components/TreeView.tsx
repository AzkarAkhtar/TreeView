import { useState } from "react";
import type { TreeNode } from "../types/tree";
import TreeNodeComponent from "./TreeNode";
import { removeNode, updateNode } from "../utils/treeUtils";
import { nanoid } from "nanoid";

const initialData: TreeNode[] = [
  {
    id: "1",
    name: "Root",
    hasChildren: true,
  },
];

export default function TreeView() {
  const [tree, setTree] = useState<TreeNode[]>(initialData);

  const updateName = (id: string, name: string) =>
    setTree(updateNode(tree, id, (n) => ({ ...n, name })));

  const addNode = (id: string, name: string) =>
    setTree(
      updateNode(tree, id, (n) => ({
        ...n,
        children: [...(n.children || []), { id: nanoid(), name }],
        hasChildren: true,
      }))
    );

  const deleteNode = (id: string) => setTree(removeNode(tree, id));

  const lazyLoad = (id: string, children: TreeNode[]) =>
    setTree(
      updateNode(tree, id, (n) => ({
        ...n,
        children,
        isLoading: false,
      }))
    );

  return (
    <div className="p-4 bg-gray-100 rounded w-fit">
      {tree.map((n) => (
        <TreeNodeComponent
          key={n.id}
          node={n}
          onUpdate={updateName}
          onAdd={addNode}
          onDelete={deleteNode}
          onLazyLoad={lazyLoad}
        />
      ))}
    </div>
  );
}
