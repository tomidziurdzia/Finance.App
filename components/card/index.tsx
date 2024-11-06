import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function CardComponent({
  title,
  data,
  children,
}: {
  title: string;
  data: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
}) {
  return (
    <Card className="bg-card text-card-foreground">
      {children ? (
        children
      ) : (
        <CardHeader>
          <CardTitle className="!text-xs font-semibold uppercase leading-none tracking-tight text-muted-foreground">
            {title}
          </CardTitle>
          <CardContent className="p-0 text-2xl font-extrabold">
            {data}
          </CardContent>
        </CardHeader>
      )}
    </Card>
  );
}
