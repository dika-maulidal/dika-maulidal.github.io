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
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <div className="rounded-lg mt-4 p-4 border border-blue-300/30 bg-blue-500/20 backdrop-blur-md">
      <li className="my-1">
        <a
          href={href}
          className="inline-block text-lg font-medium text-blue-100 decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0 hover:text-blue-300"
        >
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
        </a>
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        <p className="text-blue-300">{description}</p>
        <div className="flex flex-wrap mt-2">
          {tags.map((tag) => (
            <a
              key={tag}
              href={`/tags/${tag}/`}
              className="inline-block text-sm font-medium text-blue-100 bg-blue-500/20 border border-blue-300/30 px-3 py-1 mr-2 mt-1 rounded-md backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-blue-500/30 hover:border-blue-300/50 hover:text-blue-300 hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]"
            >
              {tag}
            </a>
          ))}
        </div>
      </li>
    </div>
  );
}