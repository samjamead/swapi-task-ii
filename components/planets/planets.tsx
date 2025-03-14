"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlanets } from "./actions";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GenericError from "../error-states/generic-error";
import PlanetsTableLoadingState from "../loading-states/planets-table-loading-state";

export default function Planets() {
  const [showLoading, setShowLoading] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["all-planets"],
    queryFn: () => getPlanets(),
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  // Custom minimum loading time to avoid flashing
  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
      }, 500);
    }
  }, [isLoading]);

  if (isError) {
    return <GenericError heading="Error" error={error.message} />;
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
              <TableHead className="text-right">Population</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(showLoading || isLoading) && <PlanetsTableLoadingState />}
            {data &&
              !showLoading &&
              !isLoading &&
              data.planets.map((planet) => (
                <TableRow key={planet.url}>
                  <TableCell>{planet.id}</TableCell>
                  <TableCell className="font-medium">{planet.name}</TableCell>
                  <TableCell>{planet.climate}</TableCell>
                  <TableCell>{planet.terrain}</TableCell>
                  <TableCell className="text-right">
                    {planet.population !== "unknown"
                      ? Number(planet.population).toLocaleString()
                      : "--"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
