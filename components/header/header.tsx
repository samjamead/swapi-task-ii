import { cn } from "@/lib/utils";
import Image from "next/image";
import GithubMark from "@/public/github-mark.svg";
import GithubMarkWhite from "@/public/github-mark-white.svg";
import Link from "next/link";

export default function Header({
  maxWidth,
  bodyGutter = "px-4",
}: {
  maxWidth: string;
  bodyGutter?: string;
}) {
  return (
    <header className={cn("w-full border-b py-12", bodyGutter)}>
      <nav
        className={cn(
          "mx-auto flex flex-col items-start justify-between gap-2 lg:flex-row lg:gap-4",
          maxWidth,
        )}
      >
        <div className="flex flex-col gap-2">
          <Link href="/">
            <h2 className="text-lg font-bold">SWAPI Task II</h2>
          </Link>
          <p className="max-w-prose text-balance text-muted-foreground lg:text-nowrap">
            The libraries strike back
          </p>
        </div>

        <a
          href="https://github.com/samjamead/swapi-task-ii"
          target="_blank"
          className="flex items-center gap-2 whitespace-nowrap rounded border px-3 py-2 font-mono text-sm transition-colors duration-300 hover:bg-blue-500/20"
        >
          <Image
            src={GithubMarkWhite}
            alt="GitHub Logo"
            width={15}
            height={15}
            className="hidden dark:block"
          />
          <Image
            src={GithubMark}
            alt="GitHub Logo"
            width={24}
            height={24}
            className="block dark:hidden"
          />
          <p>samjamead/swapi-task-ii</p>
        </a>
      </nav>
    </header>
  );
}
