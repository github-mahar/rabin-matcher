# Rabin Matcher: Client-Side Plagiarism Detection

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

## 📌 Overview

Rabin Matcher is a high-performance, client-side plagiarism detection web application that demonstrates the Rabin-Karp string matching algorithm. Unlike traditional server-based plagiarism checkers, this project runs the complex algorithmic logic entirely in the browser using TypeScript, providing instant analysis without requiring backend API calls. This approach showcases how computationally intensive tasks can be efficiently handled on the client side for educational and demonstrative purposes.

## ✨ Key Features

- **Real-time Analysis**: Detects similarities instantly as the algorithm executes directly in the browser
- **Plagiarism Heatmap**: Visualizes exact and partial matches using color-coded highlights for intuitive understanding
- **Modern UI**: Clean, responsive interface built with Tailwind CSS and React components
- **Type Safety**: Fully typed TypeScript implementation ensuring code reliability and maintainability

## ⚙️ Algorithmic Core

The heart of Rabin Matcher lies in the `src/lib/rabinKarp.ts` file, which implements the Rabin-Karp algorithm using a rolling hash technique. This approach achieves efficient string matching by computing hash values for sliding windows of text, allowing for rapid comparison of patterns against the source text.

### Rolling Hash Implementation

The rolling hash technique enables O(1) time complexity for sliding window operations by incrementally updating hash values rather than recomputing them from scratch. Here's the core hash calculation logic:

```typescript
// Calculate initial hash value for a pattern
function calculateHash(str: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < length; i++) {
    hash = (hash * BASE + str.charCodeAt(i)) % PRIME;
  }
  return hash;
}

// Recalculate hash using rolling hash technique
function recalculateHash(
  oldHash: number,
  oldChar: string,
  newChar: string,
  patternLength: number,
  h: number
): number {
  let newHash = (oldHash - oldChar.charCodeAt(0) * h) % PRIME;
  newHash = (newHash * BASE + newChar.charCodeAt(0)) % PRIME;
  
  // Handle negative modulo
  if (newHash < 0) {
    newHash += PRIME;
  }
  
  return newHash;
}
```

Where:
- `BASE = 256` (number of characters in the input alphabet)
- `PRIME = 101` (prime number for modulo operations)
- `h = BASE^(patternLength-1) % PRIME` (pre-computed multiplier for rolling hash)

### Time Complexity and TypeScript Choice

The Rabin-Karp algorithm implemented here achieves O(N+M) time complexity, where N is the length of the text and M is the length of the pattern, making it highly efficient for large-scale text analysis. TypeScript was chosen for its strong typing system, which provides compile-time error checking and enhances code readability, making the algorithmic implementation more robust and easier to maintain compared to vanilla JavaScript.

## 📂 Project Structure

```
rabin-matcher/
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── robots.txt
└── src/
    ├── App.css
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── components/
    │   ├── AlgorithmInfo.tsx
    │   ├── NavLink.tsx
    │   ├── ResultsPanel.tsx
    │   ├── TextInput.tsx
    │   └── ui/
    │       ├── accordion.tsx
    │       ├── alert-dialog.tsx
    │       ├── alert.tsx
    │       ├── aspect-ratio.tsx
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── breadcrumb.tsx
    │       ├── button.tsx
    │       ├── calendar.tsx
    │       ├── card.tsx
    │       ├── carousel.tsx
    │       ├── chart.tsx
    │       ├── checkbox.tsx
    │       ├── collapsible.tsx
    │       ├── command.tsx
    │       ├── context-menu.tsx
    │       ├── dialog.tsx
    │       ├── drawer.tsx
    │       ├── dropdown-menu.tsx
    │       ├── form.tsx
    │       ├── hover-card.tsx
    │       ├── input-otp.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── menubar.tsx
    │       ├── navigation-menu.tsx
    │       ├── pagination.tsx
    │       ├── popover.tsx
    │       ├── progress.tsx
    │       ├── radio-group.tsx
    │       ├── resizable.tsx
    │       ├── scroll-area.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── sheet.tsx
    │       ├── sidebar.tsx
    │       ├── skeleton.tsx
    │       ├── slider.tsx
    │       ├── sonner.tsx
    │       ├── switch.tsx
    │       ├── table.tsx
    │       ├── tabs.tsx
    │       ├── textarea.tsx
    │       ├── toast.tsx
    │       ├── toaster.tsx
    │       ├── toggle-group.tsx
    │       ├── toggle.tsx
    │       ├── tooltip.tsx
    │       └── use-toast.ts
    ├── hooks/
    │   ├── use-mobile.tsx
    │   └── use-toast.ts
    ├── lib/
    │   ├── rabinKarp.ts
    │   └── utils.ts
    └── pages/
        ├── Index.tsx
        └── NotFound.tsx
```

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher) or Bun
- npm or bun package manager

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rabin-matcher
   ```

2. Install dependencies:
   ```bash
   # Using npm
   npm install

   # Using bun
   bun install
   ```

3. Start the development server:
   ```bash
   # Using npm
   npm run dev

   # Using bun
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

1. Enter the original text in the first input field
2. Enter the suspected plagiarized text in the second input field
3. Adjust the window size if needed (default: 5 words)
4. Click "Analyze" to run the plagiarism detection
5. View the results in the heatmap visualization and detailed analysis panel

## 🛠️ Technologies Used

- **React 18+**: Modern React with hooks and functional components
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing tool

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📚 Learn More

- [Rabin-Karp Algorithm](https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm)
- [Rolling Hash](https://cp-algorithms.com/string/string-hashing.html)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)