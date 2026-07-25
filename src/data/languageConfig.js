export const languageConfig = {
  TypeScript: { color: 'linear-gradient(135deg, #2b7489, #1e5a6b)', icon: 'TS', priority: 100 },
  HTML: { color: 'linear-gradient(135deg, #e34c26, #c13018)', icon: 'H', priority: 90 },
  Python: { color: 'linear-gradient(135deg, #3572A5, #2d5d87)', icon: '🐍', priority: 80 },
  'C#': { color: 'linear-gradient(135deg, #178600, #106200)', icon: 'C#', priority: 70 },
  JavaScript: { color: 'linear-gradient(135deg, #f1e05a, #d4af37)', icon: 'JS', priority: 60 },
  React: { color: 'linear-gradient(135deg, #61dafb, #21b7e0)', icon: '⚛️', priority: 55 },
  Vue: { color: 'linear-gradient(135deg, #4FC08D, #369870)', icon: 'V', priority: 50 },
  CSS: { color: 'linear-gradient(135deg, #1572B6, #0e4b77)', icon: 'C', priority: 45 },
  Java: { color: 'linear-gradient(135deg, #b07219, #8b5a15)', icon: '☕', priority: 40 },
  'C++': { color: 'linear-gradient(135deg, #f34b7d, #d93a69)', icon: 'C++', priority: 35 },
  C: { color: 'linear-gradient(135deg, #555555, #333333)', icon: 'C', priority: 30 },
  PHP: { color: 'linear-gradient(135deg, #4F5D95, #3d4673)', icon: 'PHP', priority: 25 },
  Ruby: { color: 'linear-gradient(135deg, #701516, #4a0f10)', icon: '💎', priority: 20 },
  Go: { color: 'linear-gradient(135deg, #00ADD8, #0088a8)', icon: 'Go', priority: 15 },
  Rust: { color: 'linear-gradient(135deg, #dea584, #c8936b)', icon: '🦀', priority: 10 },
  Shell: { color: 'linear-gradient(135deg, #89e051, #6bb83f)', icon: '$', priority: 5 },
  Other: { color: 'linear-gradient(135deg, #858585, #666666)', icon: '📄', priority: 0 },
}

export function getLanguagePriority(lang) {
  return languageConfig[lang]?.priority || 0
}
