import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Database, Zap } from "lucide-react";

export function AlgorithmInfo() {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Rabin-Karp Algorithm
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="overview">
            <AccordionTrigger className="text-sm font-medium">
              Algorithm Overview
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3">
              <p>
                The Rabin-Karp algorithm is a string-searching algorithm that uses hashing to find 
                patterns in text. It was created by Richard M. Karp and Michael O. Rabin in 1987.
              </p>
              <p>
                <strong>Key Innovation:</strong> Instead of comparing characters directly, it computes 
                hash values for the pattern and text windows, enabling efficient bulk comparison.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rolling-hash">
            <AccordionTrigger className="text-sm font-medium">
              Rolling Hash Technique
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3">
              <p>
                The rolling hash allows us to compute the hash of the next window in O(1) time 
                by reusing the previous hash value.
              </p>
              <div className="p-3 bg-secondary/50 rounded-lg font-mono text-xs">
                <p className="text-foreground mb-2">Formula:</p>
                <code>
                  newHash = (oldHash - oldChar × h) × base + newChar
                </code>
                <p className="text-muted-foreground mt-2">
                  Where h = base^(pattern_length - 1) mod prime
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="complexity">
            <AccordionTrigger className="text-sm font-medium">
              Complexity Analysis
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">Time Complexity</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Average:</span>
                      <Badge variant="secondary" className="font-mono">O(n + m)</Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Worst:</span>
                      <Badge variant="outline" className="font-mono">O(n × m)</Badge>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">Space Complexity</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Storage:</span>
                    <Badge variant="secondary" className="font-mono">O(n)</Badge>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="comparison">
            <AccordionTrigger className="text-sm font-medium">
              vs Naive String Matching
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Aspect</th>
                      <th className="text-left py-2">Naive</th>
                      <th className="text-left py-2">Rabin-Karp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Time (avg)</td>
                      <td className="py-2 font-mono">O(n×m)</td>
                      <td className="py-2 font-mono text-primary">O(n+m)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Multiple patterns</td>
                      <td className="py-2">Inefficient</td>
                      <td className="py-2 text-primary">Excellent</td>
                    </tr>
                    <tr>
                      <td className="py-2">Implementation</td>
                      <td className="py-2">Simple</td>
                      <td className="py-2">Moderate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why Rabin-Karp for Plagiarism?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary mt-0.5" />
                <p><strong>Multiple Pattern Matching:</strong> Can search for many patterns simultaneously using a single hash table.</p>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary mt-0.5" />
                <p><strong>Sliding Window:</strong> Perfect for comparing document segments of fixed lengths.</p>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary mt-0.5" />
                <p><strong>Collision Handling:</strong> Character verification ensures accuracy despite hash collisions.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
