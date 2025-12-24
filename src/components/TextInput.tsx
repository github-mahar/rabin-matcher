import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TextInputProps {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
}

export function TextInput({ label, description, value, onChange, placeholder, icon }: TextInputProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <Label className="text-base font-semibold">{label}</Label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="relative flex-1">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-full min-h-[200px] resize-none font-mono text-sm leading-relaxed transition-all duration-200 focus:shadow-glow"
        />
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-secondary/80 backdrop-blur-sm">
          <span className="text-xs font-medium text-muted-foreground">
            {wordCount} words
          </span>
        </div>
      </div>
    </div>
  );
}
