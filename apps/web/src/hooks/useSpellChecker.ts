"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import nspell from "nspell";

interface SpellCheckResult {
  word: string;
  isCorrect: boolean;
  suggestions: string[];
  start: number;
  end: number;
}

export function useSpellChecker() {
  const [spell, setSpell] = useState<nspell | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cache for spell check results to improve performance
  const [spellCheckCache, setSpellCheckCache] = useState<
    Map<string, { isCorrect: boolean; suggestions: string[] }>
  >(new Map());

  useEffect(() => {
    let mounted = true;

    const initializeSpellChecker = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log("Loading Bengali dictionary...");

        // Load dictionary files
        const [affResponse, dicResponse] = await Promise.all([
          fetch("/bn_BD/bn_BD.aff"),
          fetch("/bn_BD/bn_BD.dic"),
        ]);

        if (!affResponse.ok || !dicResponse.ok) {
          throw new Error("Failed to load dictionary files");
        }

        const [affData, dicData] = await Promise.all([
          affResponse.text(),
          dicResponse.text(),
        ]);

        if (mounted) {
          console.log("Initializing nspell with Bengali dictionary...");
          // Initialize nspell with Bengali dictionary
          const spellChecker = nspell(affData, dicData);

          console.log("Dictionary loaded successfully!");
          setSpell(spellChecker);
        }
      } catch (err) {
        console.error("Error loading dictionary:", err);
        if (mounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeSpellChecker();

    return () => {
      mounted = false;
    };
  }, []);

  const checkWord = useCallback(
    (word: string): { isCorrect: boolean; suggestions: string[] } => {
      if (!spell) {
        return { isCorrect: true, suggestions: [] };
      }

      // Check cache first for performance
      const cached = spellCheckCache.get(word);
      if (cached) {
        return cached;
      }

      const isCorrect = spell.correct(word);
      const suggestions = isCorrect ? [] : spell.suggest(word).slice(0, 8); // Limit suggestions for better UX

      // Cache the result
      const result = { isCorrect, suggestions };
      setSpellCheckCache((prev) => new Map(prev.set(word, result)));

      return result;
    },
    [spell, spellCheckCache]
  );

  const checkText = useCallback(
    (text: string): SpellCheckResult[] => {
      if (!spell || !text.trim()) {
        return [];
      }

      const results: SpellCheckResult[] = [];
      // Enhanced regex to better capture Bengali words including compound characters
      const wordRegex = /[\u0980-\u09FF]+/g;
      let match;

      while ((match = wordRegex.exec(text)) !== null) {
        const word = match[0].trim();

        // Skip very short words (1 character) as they might be punctuation
        if (word.length <= 1) {
          continue;
        }

        const start = match.index;
        const end = start + word.length;

        const { isCorrect, suggestions } = checkWord(word);

        results.push({
          word,
          isCorrect,
          suggestions,
          start,
          end,
        });
      }

      return results;
    },
    [spell, checkWord]
  );

  const getWordCount = useCallback((text: string): number => {
    const wordRegex = /[\u0980-\u09FF]+/g;
    const matches = text.match(wordRegex);
    return matches ? matches.filter((word) => word.length > 1).length : 0;
  }, []);

  const getErrorCount = useCallback(
    (text: string): number => {
      const results = checkText(text);
      return results.filter((result) => !result.isCorrect).length;
    },
    [checkText]
  );

  // Clear cache when it gets too large to prevent memory issues
  useEffect(() => {
    if (spellCheckCache.size > 1000) {
      setSpellCheckCache(new Map());
    }
  }, [spellCheckCache.size]);

  return {
    isLoading,
    error,
    checkWord,
    checkText,
    getWordCount,
    getErrorCount,
    isReady: !isLoading && !error && spell !== null,
  };
}
