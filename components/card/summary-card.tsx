import { Card } from "../ui/card";

type SummaryProps = {
  title: string;
  data: string | number;
  icon?: React.ElementType;
  tooltip?: string;
  color?: string;
  backgroundColor?: string;
};

export default function SummaryCard({
  title,
  data,
  icon: Icon,
  color,
  backgroundColor,
}: SummaryProps) {
  return (
    <Card className="px-2 py-4 flex justify-center items-center">
      <div className="flex items-center w-full justify-between space-x-4">
        <div className="flex w-full justify-between items-center space-x-4">
          <div className={`p-2 rounded-full ${backgroundColor}`}>
            {Icon && <Icon className={`h-6 w-6 ${color}`} />}{" "}
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground capitalize">
              {title}
            </p>{" "}
            <h3 className="text-2xl font-bold text-center">{data}</h3>{" "}
          </div>
        </div>
      </div>
    </Card>
  );
}
