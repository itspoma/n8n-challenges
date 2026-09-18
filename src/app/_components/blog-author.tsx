import Image from "next/image";

import { TrackedLink } from "@/app/_components/tracked-link";
import type { Locale } from "@/lib/home-copy";
import { creditCopy, maintainer } from "@/lib/people";

// Shown after every article; matches the article byline and structured-data author.
export function BlogAuthor({ locale }: { locale: Locale }) {
  const labels = creditCopy[locale];

  return (
    <aside className="blog-author" aria-label={labels.aboutAuthor}>
      {/* The name is printed next to the photo, so the photo itself needs no alt text. */}
      <Image
        className="blog-author-photo"
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${maintainer.photo.src}`}
        alt=""
        width={maintainer.photo.width}
        height={maintainer.photo.height}
        unoptimized
      />
      <div>
        <p className="section-kicker">{labels.aboutAuthor}</p>
        <p className="blog-author-name">{maintainer.name}</p>
        <p className="blog-author-role">{maintainer.jobTitle[locale]}</p>
        <p className="blog-author-bio">{maintainer.bio[locale]}</p>
        <p className="blog-author-expertise">
          {labels.expertise}: {maintainer.expertise[locale].join(" · ")}
        </p>
        <TrackedLink
          className="blog-author-link"
          href={maintainer.linkedInUrl}
          target="_blank"
          rel="author noopener noreferrer"
          event="linkedin_click"
          eventParams={{ location: "blog_author" }}
        >
          LinkedIn <span aria-hidden="true">↗</span>
        </TrackedLink>
      </div>
    </aside>
  );
}
