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
    <div className="border-dashed border-2 rounded-lg border-primary mt-4 p-4">
      <li className="my-1">
        <a
          href={href}
          className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
        >
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
        </a>
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        <p>{description}</p>
        <div className="flex flex-wrap mt-2">
          {tags.map((tag: string) => (
            <a
              key={tag}
              href={`/tags/${tag}/`}
              className="inline-block text-sm font-medium text-skin-text-base bg-skin-card-muted px-3 py-1 mr-2 mt-1 hover:text-skin-accent transition"
              style={{
                borderRadius: "5px",
              }}
            >
              {tag}
            </a>
          ))}
        </div>
      </li>
    </div>
  );
}
