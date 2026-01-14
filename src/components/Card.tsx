import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "text-lg font-medium transition-colors group-hover:text-blue-300",
  };

  return (
    <div
      className="
        group
        rounded-lg mt-4 p-4
        border border-blue-300/20
        bg-blue-500/10
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-blue-400/60
        hover:bg-blue-500/15
        hover:shadow-[0_10px_25px_rgba(77,93,255,0.25)]
      "
    >
      <li className="my-1 flex h-full flex-col">
        {/* Title */}
        <a
          href={href}
          className="
            inline-block
            text-lg font-medium
            text-blue-100
            no-underline
            hover:text-blue-300
            transition-colors
          "
        >
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
        </a>

        {/* Date */}
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />

        {/* Description */}
        <p className="mt-2 text-blue-300">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap mt-3">
          {tags.map((tag) => (
            <a
              key={tag}
              href={`/tags/${tag}/`}
              className="
                inline-block
                text-sm font-medium
                text-blue-100
                bg-blue-500/15
                border border-blue-300/20
                px-3 py-1 mr-2 mt-1
                rounded-md
                transition-all duration-200
                hover:bg-blue-500/25
                hover:border-blue-300/40
                hover:text-blue-50
              "
            >
              {tag}
            </a>
          ))}
        </div>

        {/* Read more */}
        {href && (
          <a
            href={href}
            className="
              mt-auto pt-4
              inline-flex items-center gap-1
              text-sm font-medium
              text-blue-300
              opacity-80
              transition-all duration-300
              hover:text-blue-200
              hover:gap-2
              group-hover:opacity-100
            "
          >
            Read more
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        )}
      </li>
    </div>
  );
}
