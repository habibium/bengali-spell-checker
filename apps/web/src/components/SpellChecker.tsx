"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/useDebounce";
import { useSpellChecker } from "@/hooks/useSpellChecker";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Info,
  Lightbulb,
} from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

interface HighlightedTextProps {
  text: string;
  spellCheckResults: Array<{
    word: string;
    isCorrect: boolean;
    suggestions: string[];
    start: number;
    end: number;
  }>;
  onWordClick: (
    word: string,
    suggestions: string[],
    start: number,
    end: number
  ) => void;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  spellCheckResults,
  onWordClick,
}) => {
  const renderedText = useMemo(() => {
    if (!spellCheckResults.length) {
      return <span>{text}</span>;
    }

    const elements: React.ReactNode[] = [];
    let lastEnd = 0;

    spellCheckResults.forEach((result, index) => {
      // Add text before the current word
      if (result.start > lastEnd) {
        elements.push(
          <span key={`text-${index}`}>{text.slice(lastEnd, result.start)}</span>
        );
      }

      // Add the word with appropriate styling
      if (result.isCorrect) {
        elements.push(
          <span key={`word-${index}`} className="text-green-600 font-medium">
            {result.word}
          </span>
        );
      } else {
        elements.push(
          <span
            key={`word-${index}`}
            className="text-red-600 underline decoration-wavy cursor-pointer hover:bg-red-50 rounded px-1"
            onClick={() =>
              onWordClick(
                result.word,
                result.suggestions,
                result.start,
                result.end
              )
            }
            title={`Click for suggestions: ${result.suggestions
              .slice(0, 3)
              .join(", ")}`}
          >
            {result.word}
          </span>
        );
      }

      lastEnd = result.end;
    });

    // Add remaining text
    if (lastEnd < text.length) {
      elements.push(<span key="text-end">{text.slice(lastEnd)}</span>);
    }

    return elements;
  }, [text, spellCheckResults, onWordClick]);

  return (
    <div className="whitespace-pre-wrap leading-relaxed">{renderedText}</div>
  );
};

interface SuggestionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
  suggestions: string[];
  onReplace: (replacement: string) => void;
}

const SuggestionDialog: React.FC<SuggestionDialogProps> = ({
  isOpen,
  onClose,
  word,
  suggestions,
  onReplace,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Spelling Suggestions
          </DialogTitle>
          <DialogDescription>
            Word: <span className="font-mono text-red-600">{word}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {suggestions.length > 0 ? (
            <div>
              <Label className="text-sm font-medium">Suggestions:</Label>
              <div className="mt-2 space-y-2">
                {suggestions.slice(0, 10).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      onReplace(suggestion);
                      onClose();
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No suggestions available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function SpellChecker() {
  const [text, setText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedWord, setSelectedWord] = useState({
    word: "",
    suggestions: [] as string[],
    start: 0,
    end: 0,
  });

  // Debounce text input to improve performance
  const debouncedText = useDebounce(text, 300);

  const { isLoading, error, checkText, getWordCount, getErrorCount, isReady } =
    useSpellChecker();

  // Use debounced text for spell checking to reduce computation
  const spellCheckResults = useMemo(() => {
    if (!isReady || !debouncedText.trim()) return [];
    return checkText(debouncedText);
  }, [debouncedText, checkText, isReady]);

  // Use original text for word count (immediate feedback)
  const wordCount = useMemo(() => getWordCount(text), [text, getWordCount]);

  // Use debounced text for error count (accurate but delayed)
  const errorCount = useMemo(
    () => getErrorCount(debouncedText),
    [debouncedText, getErrorCount]
  );

  const handleWordClick = useCallback(
    (word: string, suggestions: string[], start: number, end: number) => {
      setSelectedWord({ word, suggestions, start, end });
      setShowSuggestions(true);
    },
    []
  );

  const handleReplace = useCallback(
    (replacement: string) => {
      const newText =
        text.slice(0, selectedWord.start) +
        replacement +
        text.slice(selectedWord.end);
      setText(newText);
    },
    [text, selectedWord]
  );

  const clearText = useCallback(() => {
    setText("");
  }, []);

  const sampleText = `আমি বাংলায় লিখতে পারি। এটি একটি বানান পরীক্ষক। আপনি বাংলা টেক্সট লিখুন এবং ভুল বানান চিহ্নিত করুন।`;

  const loadSampleText = useCallback(() => {
    setText(sampleText);
  }, [sampleText]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "k":
            event.preventDefault();
            clearText();
            break;
          case "l":
            event.preventDefault();
            loadSampleText();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearText, loadSampleText]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <span>Loading Bengali dictionary</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span>Error: {error}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="space-y-6">
        {/* Input Section */}
        <Card>
          <CardContent>
            <Textarea
              placeholder="Type your Bengali text here... / এখানে আপনার বাংলা টেক্সট টাইপ করুন..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[300px] text-lg font-bengali field-sizing-fixed"
              dir="ltr"
            />
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Spell Check Result</CardTitle>
            <CardDescription>
              Click the incorrect words for suggestions
            </CardDescription>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline">
                <Info />
                Words {wordCount}
              </Badge>
              <Badge
                variant="destructive"
                className="text-destructive bg-destructive/10"
              >
                <AlertCircle />
                Errors {errorCount}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full border rounded-md p-4">
              {debouncedText.trim() ? (
                <HighlightedText
                  text={debouncedText}
                  spellCheckResults={spellCheckResults}
                  onWordClick={handleWordClick}
                />
              ) : (
                <p className="text-muted-foreground italic">
                  Your checked text will appear here...
                </p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Suggestions Dialog */}
      <SuggestionDialog
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        word={selectedWord.word}
        suggestions={selectedWord.suggestions}
        onReplace={handleReplace}
      />
    </div>
  );
}
