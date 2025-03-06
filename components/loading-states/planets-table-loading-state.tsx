import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export default function PlanetsTableLoadingState() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-3 w-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-40" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-40" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-40" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-40" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
