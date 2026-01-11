# Ramzabrowser

Ramzabrowser is a TypeScript-powered developer tool that mimics the look and feel of browser DevTools.  
It provides a **custom code viewer**, **live preview**, and **console output panel**, along with a **file browser sidebar** for navigating project structures.

## ✨ Features

- **DevTools-style layout** with sidebar, editor, and console
- **CodeMirror integration** for syntax-highlighted HTML/TypeScript viewing
- **Live preview iframe** that renders HTML in real time
- **Custom console capture** for `console.log`, `console.warn`, and `console.error`
- **File browser tree** with folder/file nodes and selection callbacks
- **TypeScript-first design** with JSDoc documentation for all modules

## 📂 Project Structure

src/
* ├── consoleView.ts      # CodeMirror + iframe + console integration
* ├── fileBrowser.ts      # File/folder tree component with selection events
* └── consoleView.html    # Demo HTML with viewer + preview + console


## 🚀 Getting Started

### Prerequisites
- Node.js (>= 16)
- TypeScript (>= 4.5)
- A bundler or dev server (e.g. Vite, Webpack, Parcel)

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/ramsesrestygeorgevelez-art/ramzabrowser.git
cd ramzabrowser
npm install
```
### Development
Run the dev server:
```bash
npm run dev
```
## ⚒️ Usage:
```ts
import { FileBrowser, FileNode } from "./fileBrowser";

const files: FileNode[] = [
  {
    name: "scripts",
    type: "folder",
    children: [
      { name: "promise", type: "folder" },
      { name: "internal", type: "folder" },
      { name: "state.ts", type: "file" }
    ]
  }
];

new FileBrowser({
  container: document.getElementById("file-browser")!,
  root: files,
  onFileSelect: (file) => {
    console.log("Selected file:", file.name);
  }
});
```
## 📖 Documentation
All modules are annotated with JSDoc for clarity and IDE autocompletion.
You can generate HTML docs using TypeDoc:
```bash
npx typedoc --out docs src
```
> [!CAUTION]
> If you make an browser without the dependencies, it will not work
