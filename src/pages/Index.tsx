import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TextInput } from "@/components/TextInput";
import { ResultsPanel } from "@/components/ResultsPanel";
import { AlgorithmInfo } from "@/components/AlgorithmInfo";
import { detectPlagiarism, AnalysisResult } from "@/lib/rabinKarp";
import { toast } from "@/hooks/use-toast";
import { FileText, Search, Sparkles, ArrowRight, BookOpen, Code2, Shield } from "lucide-react";

const Index = () => {
  const [originalText, setOriginalText] = useState("");
  const [suspectedText, setSuspectedText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!originalText.trim() || !suspectedText.trim()) {
      toast({
        title: "Missing Input",
        description: "Please provide both original and suspected text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing time for visual effect
    setTimeout(() => {
      const analysisResult = detectPlagiarism(originalText, suspectedText);
      setResult(analysisResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Found ${analysisResult.plagiarismPercentage}% similarity in the suspected text.`,
      });
    }, 800);
  };

  const handleClear = () => {
    setOriginalText("");
    setSuspectedText("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powered by Rabin-Karp Algorithm</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Plagiarism Detection
              <span className="text-gradient block mt-2">Made Transparent</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Educational tool demonstrating string matching algorithms. 
              Visualize how the Rabin-Karp algorithm detects textual similarities 
              with rolling hash and collision handling.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>No AI or External APIs</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                <span>Pure Algorithm Implementation</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>Educational Visualization</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-elevated overflow-hidden">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <TextInput
                    label="Original Text"
                    description="The source document to compare against"
                    value={originalText}
                    onChange={setOriginalText}
                    placeholder="Paste or type the original text here..."
                    icon={<FileText className="w-4 h-4" />}
                  />
                  <TextInput
                    label="Suspected Text"
                    description="The document to check for plagiarism"
                    value={suspectedText}
                    onChange={setSuspectedText}
                    placeholder="Paste or type the suspected text here..."
                    icon={<Search className="w-4 h-4" />}
                  />
                </div>

                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    className="flex-1 md:flex-none"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Detect Plagiarism
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleClear}
                    disabled={isAnalyzing}
                  >
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {result && <ResultsPanel result={result} />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AlgorithmInfo />

            {/* Quick Demo */}
            <Card className="card-elevated">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Try a Demo
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Load sample texts to see the algorithm in action.
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => {
                    setOriginalText(
                      "The quick brown fox jumps over the lazy dog. This is a classic pangram used in typography and testing. It contains every letter of the English alphabet at least once."
                    );
                    setSuspectedText(
                      "The quick brown fox jumps over the lazy dog. This sentence is often used in font testing. It contains every letter of the English alphabet."
                    );
                    setResult(null);
                    toast({
                      title: "Demo Loaded",
                      description: "Sample texts have been loaded. Click 'Detect Plagiarism' to analyze.",
                    });
                  }}
                >
                  Load Sample Texts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built for educational purposes • Demonstrating Rabin-Karp String Matching Algorithm
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
