# Rabin-Karp Plagiarism Detection System

A web-based plagiarism checker that detects textual similarity using the **Rabin-Karp string matching algorithm**. Built for academic demonstration of algorithmic efficiency, rolling hash techniques, and educational visualization.

![Plagiarism Detection](https://img.shields.io/badge/Algorithm-Rabin--Karp-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Algorithm Implementation](#algorithm-implementation)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Complexity Analysis](#complexity-analysis)
- [Academic Documentation](#academic-documentation)
- [License](#license)

---

## Overview

This project implements a **fully functional plagiarism detection system** that:

- Accurately detects copied text between two documents
- Visually highlights plagiarism with a color-coded heatmap
- Clearly demonstrates the Rabin-Karp algorithm in practice
- Meets academic standards for an algorithms course

**No AI models or external plagiarism APIs are used.** The system relies entirely on the Rabin-Karp string matching algorithm with manual implementation.

---

## Features

### Core Functionality

- ✅ **Dual Text Input**: Compare original (source) and suspected documents
- ✅ **Plagiarism Percentage**: Calculate similarity based on matched content
- ✅ **Word Analysis**: Track total words analyzed and matched words
- ✅ **Real-time Processing**: Instant analysis with visual feedback

### 🔥 Unique Feature: Plagiarism Heatmap with Source Attribution

The standout feature that differentiates this from basic plagiarism checkers:

| Color | Match Type | Description |
|-------|------------|-------------|
| 🔴 Red | Exact Match | Character-for-character identical sequences |
| 🟡 Yellow | Partial Match | Similar content with minor variations |
| ⚪ White | Original | No plagiarism detected |

Each highlighted segment shows:
- The matching text from the original document
- Position in the source document
- Hash values used for detection

### Algorithm Visualization

- **Step-by-step breakdown** of the Rabin-Karp process
- **Rolling hash demonstration** showing window slides
- **Collision handling** visualization
- **Educational explanations** suitable for academic presentation

---

## Algorithm Implementation

### Rabin-Karp Algorithm

The implementation follows the classic Rabin-Karp approach with these components:

#### Rolling Hash Function

```typescript
hash(s) = (s[0] * d^(m-1) + s[1] * d^(m-2) + ... + s[m-1]) mod q
```

Where:
- `d` = 256 (number of characters in alphabet)
- `q` = 101 (prime number for modulo operation)
- `m` = window size (default: 5 words)

#### Hash Recalculation (Rolling)

```typescript
newHash = (d * (oldHash - s[0] * h) + s[m]) mod q
```

Where `h = d^(m-1) mod q`

#### Collision Handling

When hash values match, the algorithm performs **character-by-character verification** to confirm actual string matches, eliminating false positives.

### Why Rabin-Karp?

| Algorithm | Average Time | Worst Time | Best For |
|-----------|-------------|------------|----------|
| Naive | O(nm) | O(nm) | Short patterns |
| **Rabin-Karp** | **O(n+m)** | O(nm) | **Multiple pattern matching** |
| KMP | O(n+m) | O(n+m) | Single pattern |

Rabin-Karp excels in plagiarism detection because:
1. Efficient for checking multiple substrings
2. Rolling hash minimizes recalculation
3. Easy to extend for approximate matching

---

## Technology Stack

### Frontend
- **React 18.3** - Component-based UI
- **TypeScript 5.0** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Lucide React** - Icon library

### Algorithm
- **Custom Rabin-Karp** - Manual implementation in TypeScript
- **Rolling Hash** - Polynomial hash function
- **No external libraries** - Pure algorithmic approach

---

## Installation

### Prerequisites

- Node.js 18+ 
- npm or bun package manager

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd rabin-karp-plagiarism-checker

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Usage

### Basic Usage

1. **Enter Original Text**: Paste the source document in the left panel
2. **Enter Suspected Text**: Paste the document to check in the right panel
3. **Click "Analyze for Plagiarism"**: Run the Rabin-Karp algorithm
4. **Review Results**: 
   - Check plagiarism percentage
   - View highlighted matches in the heatmap
   - Explore algorithm steps

### Demo Mode

Click **"Load Demo"** to populate sample texts demonstrating exact and partial matches.

### Interpreting Results

```
┌─────────────────────────────────────────┐
│  Plagiarism Score: 45%                  │
│  ████████████░░░░░░░░░░░░░░             │
│                                         │
│  Total Words: 150                       │
│  Matched Words: 68                      │
│  Exact Matches: 12                      │
│  Partial Matches: 8                     │
└─────────────────────────────────────────┘
```

---

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── AlgorithmInfo.tsx    # Educational algorithm panel
│   ├── ResultsPanel.tsx     # Results and heatmap display
│   ├── TextInput.tsx        # Text input component
│   └── NavLink.tsx          # Navigation component
│
├── lib/
│   ├── rabinKarp.ts     # Core algorithm implementation
│   └── utils.ts         # Utility functions
│
├── pages/
│   ├── Index.tsx        # Main application page
│   └── NotFound.tsx     # 404 page
│
├── hooks/               # Custom React hooks
├── index.css            # Global styles & design tokens
└── main.tsx             # Application entry point
```

### Key Files

| File | Description |
|------|-------------|
| `src/lib/rabinKarp.ts` | Complete Rabin-Karp algorithm with rolling hash |
| `src/components/ResultsPanel.tsx` | Heatmap visualization and results display |
| `src/components/AlgorithmInfo.tsx` | Educational content about the algorithm |

---

## Complexity Analysis

### Time Complexity

| Operation | Complexity | Notes |
|-----------|------------|-------|
| Hash Computation | O(m) | Initial window hash |
| Rolling Hash Update | O(1) | Constant time per slide |
| Full Text Scan | O(n) | Single pass through text |
| **Average Case** | **O(n + m)** | With good hash distribution |
| Worst Case | O(nm) | Many hash collisions |

Where:
- `n` = length of suspected text
- `m` = window size (pattern length)

### Space Complexity

| Component | Complexity | Description |
|-----------|------------|-------------|
| Hash Storage | O(n) | Store hashes for all windows |
| Match Storage | O(k) | k = number of matches found |
| **Total** | **O(n)** | Linear space usage |

---

## Academic Documentation

### Algorithm Justification

**Why Rabin-Karp over alternatives?**

1. **vs Naive Approach**: Rabin-Karp's rolling hash provides O(1) hash updates vs O(m) recalculation
2. **vs KMP**: Better suited for multiple pattern matching scenarios
3. **vs Boyer-Moore**: Simpler implementation while maintaining efficiency

### Educational Value

This implementation demonstrates:

- **Sliding Window Technique**: Visual representation of window movement
- **Hashing Concepts**: Polynomial rolling hash with modular arithmetic
- **Collision Resolution**: Character-by-character verification after hash match
- **Algorithm Analysis**: Clear complexity breakdowns

### References

1. Karp, R. M., & Rabin, M. O. (1987). "Efficient randomized pattern-matching algorithms"
2. Cormen, T. H., et al. "Introduction to Algorithms" - Chapter 32: String Matching
3. Sedgewick, R. "Algorithms in C" - Part 5: Strings

---

## API Reference

### Core Functions

```typescript
// Main detection function
detectPlagiarism(
  originalText: string,
  suspectedText: string,
  windowSize?: number
): AnalysisResult

// Hash calculation
calculateHash(str: string, prime: number, d: number): number

// Rolling hash update
recalculateHash(
  oldHash: number,
  oldChar: string,
  newChar: string,
  h: number,
  prime: number,
  d: number
): number
```

### Types

```typescript
interface Match {
  suspectedStart: number;
  suspectedEnd: number;
  originalStart: number;
  originalEnd: number;
  matchedText: string;
  isExact: boolean;
  hashValue: number;
}

interface AnalysisResult {
  plagiarismPercentage: number;
  totalWords: number;
  matchedWords: number;
  matches: Match[];
  algorithmSteps: AlgorithmStep[];
  processedSegments: ProcessedSegment[];
}
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Algorithm based on the work of Michael O. Rabin and Richard M. Karp
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

<p align="center">
  <strong>Built for Academic Excellence</strong><br>
  Demonstrating String Matching Algorithms in Practice
</p>
