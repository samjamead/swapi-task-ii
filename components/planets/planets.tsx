"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlanets } from "./actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import PlanetsTableLoadingState from "../loading-states/planets-table-loading-state";

export default function Planets() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["planets", page],
    queryFn: () => getPlanets(page),
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isError) {
    toast.error("Failed to load planets", {
      description:
        error instanceof Error ? error.message : "Please try again later",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          Behold, the planets of the Star Wars universe
        </h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Climate</TableHead>
              <TableHead>Terrain</TableHead>
              <TableHead>Population</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <PlanetsTableLoadingState />}
            {data &&
              data.planets.map((planet) => (
                <TableRow key={planet.url}>
                  <TableCell>{planet.id.padStart(3, "0")}.</TableCell>
                  <TableCell className="font-medium">{planet.name}</TableCell>
                  <TableCell>{planet.climate}</TableCell>
                  <TableCell>{planet.terrain}</TableCell>
                  <TableCell>{planet.population}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {data && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing page {data.pagination.currentPage} of{" "}
            {Math.ceil(data.pagination.total / 10)}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => p - 1)}
              disabled={!data.pagination.hasPreviousPage}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={!data.pagination.hasNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
