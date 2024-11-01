import { Card } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ArrowUpRight } from "lucide-react";

type SummaryProps = {
  title: string;
  data: string | number;
  icon: React.ElementType;
  tooltip?: string;
  color: string;
  backgroundColor: string;
};

interface IconWithTooltipProps {
  icon: React.ElementType;
  tooltip?: string;
}

const IconWithTooltip: React.FC<IconWithTooltipProps> = ({
  icon: Icon,
  tooltip,
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </TooltipTrigger>
    {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
  </Tooltip>
);

export default function SummaryCard({
  title,
  data,
  icon: Icon,
  tooltip = "",
  color,
  backgroundColor,
}: SummaryProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-full ${backgroundColor}`}>
            <Icon className={`h-6 w-6 ${color}`} />{" "}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground capitalize">
              {title}
            </p>{" "}
            <h3 className="text-2xl font-bold">{data}</h3>{" "}
          </div>
        </div>
        <IconWithTooltip icon={ArrowUpRight} tooltip={tooltip} />
      </div>
    </Card>
  );
}
