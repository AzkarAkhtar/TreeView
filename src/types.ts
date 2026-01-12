export type NodeId = string;

export interface TreeNodeData {
  id: NodeId;
  name: string;
  children?: TreeNodeData[];
  hasMore?: boolean; // for lazy loading indicator
  isLoading?: boolean; // local loading state
}

export interface FlattenedNode {
  id: NodeId;
  parentId: NodeId | null;
  depth: number;
  index: number;
  node: TreeNodeData;
}

export type TreeMap = Record<NodeId, TreeNodeData>;