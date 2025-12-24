import { AnalysisResult, ProcessedSegment } from "@/lib/rabinKarp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileText, Hash, Target, AlertTriangle, CheckCircle } from "lucide-react";

interface ResultsPanelProps {
  result: AnalysisResult;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  const getPlagiarismLevel = (percentage: number) => {
    if (percentage >= 70) return { label: "High", color: "destructive" as const, icon: AlertTriangle };
    if (percentage >= 30) return { label: "Medium", color: "warning" as const, icon: AlertTriangle };
    return { label: "Low", color: "success" as const, icon: CheckCircle };
  };

  const level = getPlagiarismLevel(result.plagiarismPercentage);
  const LevelIcon = level.icon;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-elevated">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Plagiarism Score</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{result.plagiarismPercentage}%</span>
                  <Badge variant={level.color === "success" ? "secondary" : level.color === "warning" ? "outline" : "destructive"}>
                    <LevelIcon className="w-3 h-3 mr-1" />
                    {level.label}
                  </Badge>
                </div>
              </div>
            </div>
            <Progress 
              value={result.plagiarismPercentage} 
              className="mt-4 h-2"
            />
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent">
                <FileText className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Words</p>
                <span className="text-2xl font-bold">{result.totalWords}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-match-exact-bg">
                <Hash className="w-6 h-6 text-match-exact" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Matched Words</p>
                <span className="text-2xl font-bold">{result.matchedWords}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap Visualization */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Plagiarism Heatmap</span>
            <Badge variant="outline" className="font-normal">Source Attribution</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1 mb-6 leading-relaxed">
            {result.processedText.map((segment, index) => (
              <HeatmapWord key={index} segment={segment} />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="match-exact px-2 py-0.5 text-sm font-medium">Example</span>
              <span className="text-sm text-muted-foreground">Exact Match</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="match-partial px-2 py-0.5 text-sm font-medium">Example</span>
              <span className="text-sm text-muted-foreground">Partial Match</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-sm font-medium bg-secondary rounded">Example</span>
              <span className="text-sm text-muted-foreground">Original Content</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Steps */}
      {result.algorithmSteps.length > 0 && (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Algorithm Visualization</span>
              <Badge variant="secondary">Rabin-Karp Steps</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {result.algorithmSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border transition-colors ${
                    step.matched 
                      ? 'bg-match-exact-bg border-match-exact/30' 
                      : 'bg-secondary/50 border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {step.step}
                      </span>
                      <div>
                        <code className="font-mono text-sm bg-background/80 px-2 py-0.5 rounded">
                          "{step.windowText}"
                        </code>
                        <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                    <Badge variant={step.matched ? "destructive" : "secondary"} className="font-mono">
                      Hash: {step.hashValue}
                    </Badge>
                  </div>
                  {step.sourceMatch && (
                    <div className="mt-2 ml-9 text-xs text-muted-foreground">
                      <span className="font-medium">Source:</span> "{step.sourceMatch}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function HeatmapWord({ segment }: { segment: ProcessedSegment }) {
  const getClassName = () => {
    switch (segment.type) {
      case 'exact':
        return 'match-exact';
      case 'partial':
        return 'match-partial';
      default:
        return '';
    }
  };

  return (
    <span 
      className={`${getClassName()} transition-all duration-200 hover:scale-105 cursor-default`}
      title={segment.sourceIndex !== undefined ? `Matches source at position ${segment.sourceIndex}` : undefined}
    >
      {segment.text}
    </span>
  );
}
