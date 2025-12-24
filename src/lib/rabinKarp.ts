// Rabin-Karp Algorithm Implementation
// Using rolling hash technique with collision handling

const PRIME = 101; // Prime number for hash calculation
const BASE = 256; // Number of characters in the input alphabet

export interface Match {
  startIndex: number;
  endIndex: number;
  matchedText: string;
  sourceIndex: number;
  type: 'exact' | 'partial';
  hashValue: number;
}

export interface AnalysisResult {
  plagiarismPercentage: number;
  totalWords: number;
  matchedWords: number;
  matches: Match[];
  algorithmSteps: AlgorithmStep[];
  processedText: ProcessedSegment[];
}

export interface AlgorithmStep {
  step: number;
  description: string;
  windowText: string;
  hashValue: number;
  matched: boolean;
  sourceMatch?: string;
}

export interface ProcessedSegment {
  text: string;
  type: 'exact' | 'partial' | 'original';
  sourceIndex?: number;
}

// Calculate hash value for a pattern
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

// Pre-compute h = BASE^(patternLength-1) % PRIME
function computeH(patternLength: number): number {
  let h = 1;
  for (let i = 0; i < patternLength - 1; i++) {
    h = (h * BASE) % PRIME;
  }
  return h;
}

// Normalize text for comparison
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
}

// Extract words from text
function extractWords(text: string): string[] {
  return normalizeText(text).split(' ').filter(word => word.length > 0);
}

// Main Rabin-Karp implementation
export function detectPlagiarism(
  originalText: string,
  suspectedText: string,
  windowSize: number = 5
): AnalysisResult {
  const originalNormalized = normalizeText(originalText);
  const suspectedNormalized = normalizeText(suspectedText);
  
  const originalWords = extractWords(originalText);
  const suspectedWords = extractWords(suspectedText);
  
  const matches: Match[] = [];
  const algorithmSteps: AlgorithmStep[] = [];
  const matchedIndices = new Set<number>();
  
  if (suspectedWords.length === 0 || originalWords.length === 0) {
    return {
      plagiarismPercentage: 0,
      totalWords: suspectedWords.length,
      matchedWords: 0,
      matches: [],
      algorithmSteps: [],
      processedText: suspectedWords.map(word => ({ text: word, type: 'original' as const }))
    };
  }
  
  // Adjust window size if texts are too short
  const effectiveWindowSize = Math.min(windowSize, originalWords.length, suspectedWords.length);
  
  if (effectiveWindowSize < 2) {
    // Fall back to single word matching
    return singleWordMatch(originalWords, suspectedWords);
  }
  
  // Create patterns from original text (sliding windows)
  const originalPatterns: Map<number, { text: string; index: number }[]> = new Map();
  
  for (let i = 0; i <= originalWords.length - effectiveWindowSize; i++) {
    const pattern = originalWords.slice(i, i + effectiveWindowSize).join(' ');
    const hash = calculateHash(pattern, pattern.length);
    
    if (!originalPatterns.has(hash)) {
      originalPatterns.set(hash, []);
    }
    originalPatterns.get(hash)!.push({ text: pattern, index: i });
  }
  
  // Slide through suspected text
  const h = computeH(effectiveWindowSize);
  let stepCount = 0;
  
  for (let i = 0; i <= suspectedWords.length - effectiveWindowSize; i++) {
    const window = suspectedWords.slice(i, i + effectiveWindowSize).join(' ');
    const windowHash = calculateHash(window, window.length);
    
    let matched = false;
    let matchedSource = '';
    let matchType: 'exact' | 'partial' = 'exact';
    let sourceIdx = -1;
    
    // Check if hash matches any original pattern
    if (originalPatterns.has(windowHash)) {
      const candidates = originalPatterns.get(windowHash)!;
      
      for (const candidate of candidates) {
        // Collision handling: verify actual string match
        if (candidate.text === window) {
          matched = true;
          matchedSource = candidate.text;
          sourceIdx = candidate.index;
          
          // Mark all words in this window as matched
          for (let j = i; j < i + effectiveWindowSize; j++) {
            matchedIndices.add(j);
          }
          
          matches.push({
            startIndex: i,
            endIndex: i + effectiveWindowSize - 1,
            matchedText: window,
            sourceIndex: sourceIdx,
            type: 'exact',
            hashValue: windowHash
          });
          break;
        }
      }
    }
    
    // Check for partial matches (at least 60% of words match)
    if (!matched) {
      for (let j = 0; j <= originalWords.length - effectiveWindowSize; j++) {
        const origWindow = originalWords.slice(j, j + effectiveWindowSize);
        const suspWindow = suspectedWords.slice(i, i + effectiveWindowSize);
        
        let matchCount = 0;
        for (const word of suspWindow) {
          if (origWindow.includes(word)) {
            matchCount++;
          }
        }
        
        if (matchCount >= Math.ceil(effectiveWindowSize * 0.6) && matchCount < effectiveWindowSize) {
          matched = true;
          matchType = 'partial';
          matchedSource = origWindow.join(' ');
          sourceIdx = j;
          
          // Mark matching words
          for (let k = i; k < i + effectiveWindowSize; k++) {
            if (origWindow.includes(suspectedWords[k])) {
              matchedIndices.add(k);
            }
          }
          
          matches.push({
            startIndex: i,
            endIndex: i + effectiveWindowSize - 1,
            matchedText: suspWindow.join(' '),
            sourceIndex: sourceIdx,
            type: 'partial',
            hashValue: windowHash
          });
          break;
        }
      }
    }
    
    // Record algorithm step (limit to first 20 for performance)
    if (stepCount < 20) {
      algorithmSteps.push({
        step: stepCount + 1,
        description: matched 
          ? `Hash ${windowHash} matched! Verified: ${matchType} match`
          : `Hash ${windowHash} - No match found`,
        windowText: window,
        hashValue: windowHash,
        matched,
        sourceMatch: matchedSource || undefined
      });
    }
    stepCount++;
  }
  
  // Build processed text with highlighting info
  const processedText: ProcessedSegment[] = suspectedWords.map((word, idx) => {
    const matchInfo = matches.find(m => idx >= m.startIndex && idx <= m.endIndex);
    
    if (matchInfo) {
      return {
        text: word,
        type: matchInfo.type,
        sourceIndex: matchInfo.sourceIndex
      };
    }
    
    return { text: word, type: 'original' as const };
  });
  
  const matchedWords = matchedIndices.size;
  const plagiarismPercentage = suspectedWords.length > 0 
    ? Math.round((matchedWords / suspectedWords.length) * 100) 
    : 0;
  
  return {
    plagiarismPercentage,
    totalWords: suspectedWords.length,
    matchedWords,
    matches,
    algorithmSteps,
    processedText
  };
}

// Fallback for very short texts
function singleWordMatch(originalWords: string[], suspectedWords: string[]): AnalysisResult {
  const originalSet = new Set(originalWords.map(w => w.toLowerCase()));
  const processedText: ProcessedSegment[] = [];
  let matchedCount = 0;
  
  for (const word of suspectedWords) {
    if (originalSet.has(word.toLowerCase())) {
      processedText.push({ text: word, type: 'exact' });
      matchedCount++;
    } else {
      processedText.push({ text: word, type: 'original' });
    }
  }
  
  return {
    plagiarismPercentage: suspectedWords.length > 0 
      ? Math.round((matchedCount / suspectedWords.length) * 100) 
      : 0,
    totalWords: suspectedWords.length,
    matchedWords: matchedCount,
    matches: [],
    algorithmSteps: [],
    processedText
  };
}

// Time Complexity: O(n * m) in worst case, O(n + m) average case
// Space Complexity: O(n) for storing patterns
// Where n = length of original text, m = length of suspected text
