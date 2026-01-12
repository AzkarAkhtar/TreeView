import { useState } from "react";
import type { TreeNode as Node } from "../types/tree";
import { fetchChildren } from "../api/mockApi";

interface Props {
  node: Node;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onAdd: (id: string, name: string) => void;
  onLazyLoad: (id: string, children: Node[]) => void;
}

export default function TreeNode({
  node,
  onUpdate,
  onDelete,
  onAdd,
  onLazyLoad,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(node.name);

  const toggle = async () => {
    if (!expanded && node.hasChildren && !node.children) {
      onLazyLoad(node.id, []);
      const children = await fetchChildren(node.id);
      onLazyLoad(node.id, children);
    }
    setExpanded(!expanded);
  };

  return (
    <div className="ml-4">
      <div className="flex items-center gap-2">
        {node.hasChildren && (
          <button onClick={toggle} className="text-xs">
            {expanded ? "▼" : "▶"}
          </button>
        )}

        {editing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              onUpdate(node.id, value);
              setEditing(false);
            }}
            className="border px-1 text-sm"
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={() => setEditing(true)}
            className="cursor-pointer"
          >
            {node.name}
          </span>
        )}

        <button
          onClick={() => {
            const name = prompt("Child name");
            if (name) onAdd(node.id, name);
          }}
          className="text-green-600 text-xs"
        >
          +
        </button>

        <button
          onClick={() => {
            if (confirm("Delete this node?")) onDelete(node.id);
          }}
          className="text-red-600 text-xs"
        >
          ✕
        </button>
      </div>

      {expanded && node.children && (
        <div>
          {node.children.map((c) => (
            <TreeNode
              key={c.id}
              node={c}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onAdd={onAdd}
              onLazyLoad={onLazyLoad}
            />
          ))}
        </div>
      )}
    </div>
  );
}
