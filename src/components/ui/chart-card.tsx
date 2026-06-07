import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ChartCardProps = {
  title: string;
  description?: string;
  badge?: string;
  children: React.ReactNode;
};

export function ChartCard({ title, description, badge, children }: ChartCardProps) {
  return (
    <Card className="overflow-hidden border-white/70 bg-white/78 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black tracking-normal text-slate-950">{title}</h2>
          {description && <p className="mt-1 text-sm font-medium text-slate-500">{description}</p>}
        </div>
        {badge && <Badge tone="blue">{badge}</Badge>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
