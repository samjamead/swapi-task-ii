"use server";

import { PlanetsAPIResponse } from "@/lib/types";

export async function getPlanets() {
  try {
    // Function to fetch a single page
    async function fetchPage(url: string) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }

    // Start with first page
    let url: string | null = "https://swapi.dev/api/planets/";
    const allPlanets: PlanetsAPIResponse["results"] = [];

    // Keep fetching until there are no more pages
    while (url) {
      const data: PlanetsAPIResponse = await fetchPage(url);
      allPlanets.push(...data.results);
      url = data.next;
    }

    // Return all planets with IDs
    return {
      planets: allPlanets.map((planet) => ({
        ...planet,
        id: planet.url.split("/").slice(-2, -1)[0]?.padStart(3, "0"),
      })),
    };
  } catch (error) {
    console.error("Error fetching planets:", error);
    throw error;
  }
}
