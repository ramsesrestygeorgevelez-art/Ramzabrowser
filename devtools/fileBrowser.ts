/**
 * Represents a node in the file browser tree.
 */
export interface FileNode {
  /** Display name of the file or folder */
  name: string;
  /** Type of node: "file" or "folder" */
  type: "file" | "folder";
  /** Child nodes (only for folders) */
  children?: FileNode[];
}

/**
 * Configuration options for the FileBrowser component.
 */
export interface FileBrowserOptions {
  /** The container element where the file browser will be rendered */
  container: HTMLElement;
  /** Root nodes of the file tree */
  root: FileNode[];
  /**
   * Callback invoked when a file node is selected.
   * @param file The file node that was clicked.
   */
  onFileSelect?: (file: FileNode) => void;
}

/**
 * FileBrowser renders a simple file/folder tree structure into a container.
 * It mimics a DevTools-style sidebar and allows file selection events.
 *
 * @example
 * ```ts
 * const files: FileNode[] = [
 *   {
 *     name: "scripts",
 *     type: "folder",
 *     children: [
 *       { name: "promise", type: "folder" },
 *       { name: "internal", type: "folder" },
 *       { name: "state.ts", type: "file" }
 *     ]
 *   }
 * ];
 *
 * const browser = new FileBrowser({
 *   container: document.getElementById("file-browser")!,
 *   root: files,
 *   onFileSelect: (file) => {
 *     console.log("Selected file:", file.name);
 *   }
 * });
 * ```
 */
export class FileBrowser {
  private container: HTMLElement;
  private root: FileNode[];
  private onFileSelect?: (file: FileNode) => void;

  /**
   * Creates a new FileBrowser instance.
   * @param options Configuration options including container, root nodes, and optional file select callback.
   */
  constructor(options: FileBrowserOptions) {
    this.container = options.container;
    this.root = options.root;
    this.onFileSelect = options.onFileSelect;
    this.render();
  }

  /**
   * Renders the file tree into the container.
   */
  private render(): void {
    this.container.innerHTML = "";
    const ul = document.createElement("ul");
    ul.style.listStyle = "none";
    ul.style.paddingLeft = "10px";
    this.root.forEach(node => ul.appendChild(this.renderNode(node)));
    this.container.appendChild(ul);
  }

  /**
   * Recursively renders a file or folder node.
   * @param node The file or folder node to render.
   * @returns The HTML element representing the node.
   */
  private renderNode(node: FileNode): HTMLElement {
    const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.textContent = node.type === "folder" ? `📂 ${node.name}` : `📄 ${node.name}`;

    if (node.type === "folder" && node.children) {
      const childList = document.createElement("ul");
      childList.style.listStyle = "none";
      childList.style.paddingLeft = "20px";
      node.children.forEach(child => childList.appendChild(this.renderNode(child)));
      li.appendChild(childList);
    }

    if (node.type === "file") {
      li.addEventListener("click", () => {
        if (this.onFileSelect) this.onFileSelect(node);
      });
    }

    return li;
  }
}
