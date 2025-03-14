export default function GenericError({
  heading,
  error,
}: {
  heading: string;
  error: string;
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="text-sm text-muted-foreground">
        An error occurred while fetching the data:
      </p>

      <pre className="max-w-md rounded-md bg-muted px-4 py-2 font-mono">
        {error}
      </pre>
      <p className="text-sm text-muted-foreground">
        Apologies, sometimes this can be fixed by refreshing the page.
      </p>
    </div>
  );
}
