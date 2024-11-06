import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function CardLoader({
  cards = 1,
  className = "",
}: {
  cards?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ${className}`}
    >
      {Array(cards)
        .fill(0)
        .map((card, index) => (
          <Card key={`${card}-${index}`} className="px-2 py-4">
            <div className="pb-0">
              <div>
                <Skeleton className="h-4 rounded-sm" />
              </div>
            </div>
            <div>
              <Skeleton className="mt-2 h-7 w-[60%] rounded-sm" />
            </div>
          </Card>
        ))}
    </div>
  );
}
