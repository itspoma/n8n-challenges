import { SkillsAssessmentPreview } from "@/app/_components/skills-assessment-preview";
import { TrackedLink } from "@/app/_components/tracked-link";
import type { Locale } from "@/lib/home-copy";
import { skillsAssessmentCopy, skillsAssessmentUrl } from "@/lib/skills-assessment";

type SkillsAssessmentCalloutProps = {
  locale: Locale;
  // Under the landing page's level cards, or at the end of a challenge page.
  placement: "home_levels" | "challenge_page";
  challengeSlug?: string;
};

/** Strip that sends learners to the free n8n Skills Assessment on AI Adoption Score. */
export function SkillsAssessmentCallout({ locale, placement, challengeSlug }: SkillsAssessmentCalloutProps) {
  const copy = skillsAssessmentCopy[locale];
  const { title, body } = placement === "home_levels" ? copy.levels : copy.challenge;

  return (
    <aside className="skills-assessment-callout" aria-labelledby="skills-assessment-title">
      <div className="skills-assessment-callout-copy">
        <p className="skills-assessment-callout-title" id="skills-assessment-title">
          {title}
        </p>
        <p>{body}</p>
        <p className="skills-assessment-callout-source">{copy.source}</p>
      </div>
      <div className="skills-assessment-callout-aside">
        <SkillsAssessmentPreview
          label={copy.preview.label}
          sample={copy.preview.sample}
          caption={copy.preview.caption}
        />
        <TrackedLink
          className="button button-dark skills-assessment-callout-button"
          href={skillsAssessmentUrl(placement)}
          target="_blank"
          rel="noopener noreferrer"
          event="skills_assessment_click"
          eventParams={challengeSlug ? { location: placement, challenge_slug: challengeSlug } : { location: placement }}
        >
          {copy.button} <span aria-hidden="true">↗</span>
        </TrackedLink>
      </div>
    </aside>
  );
}
