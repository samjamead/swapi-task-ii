"use server";

import { PlanetsAPIResponse } from "@/lib/types";

export async function getPlanets(page: number = 1) {
  try {
    const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PlanetsAPIResponse = await response.json();
    return {
      planets: data.results.map((planet) => ({
        ...planet,
        id: planet.url.split("/").slice(-2, -1)[0]?.padStart(3, "0"),
      })),
      pagination: {
        total: data.count,
        currentPage: page,
        hasNextPage: data.next !== null,
        hasPreviousPage: data.previous !== null,
      },
    };
  } catch (error) {
    console.error("Error fetching planets:", error);
    throw error;
  }
}
