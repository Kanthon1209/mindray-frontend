import { Activity } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-16 items-center gap-3 border-b bg-white px-6 dark:bg-zinc-950">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Activity className="h-5 w-5" />
        </div>
        <span className="text-lg font-bold tracking-tight">Mindray</span>
      </div>
      <div className="h-6 w-px bg-border" />
      <span className="text-sm font-medium text-muted-foreground">
        IVD 产品应用价值平台
      </span>
    </header>
  );
}
