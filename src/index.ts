import namePairs from './name_pairs.json';



  
  // Utility: Compute Levenshtein distance
  function levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
      Array(b.length + 1).fill(0)
    );
  
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // Deletion
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j - 1] + cost // Substitution
        );
      }
    }
  
    return matrix[a.length][b.length];
  }
  
  // Main function: Find closest match
export function findClosestArabicName(englishName: string): string {
    if (!/^[a-zA-Z]+$/.test(englishName)) {
        throw new Error("Input must contain only English characters.");
    }
    let closestMatch = namePairs[0];
    let smallestDistance = Infinity;
  
    for (const pair of namePairs) {
      const distance = levenshteinDistance(
        englishName.toLowerCase(),
        pair.e.toLowerCase()
      );
  
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestMatch = pair;
      }
    }
  
    return closestMatch.a;
  }
  
