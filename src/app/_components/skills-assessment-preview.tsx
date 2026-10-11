type SkillsAssessmentPreviewProps = {
  label: string;
  sample: string;
  caption: string;
};

// Four sample results the card cycles through. The levels are the assessment's own
// English names, and the scores are the midpoints of their bands out of 30.
const SAMPLE_RESULTS = [
  { score: 13, level: "Explorer" },
  { score: 18, level: "Practitioner" },
  { score: 23, level: "Advanced" },
  { score: 28, level: "Expert" },
];

/**
 * Sample result card beside the call to action: shows what the assessment gives back –
 * a score out of 30 and a level – instead of leaving the strip as one flat block.
 * Decorative, so it is hidden from assistive technology: the copy beside it says the same.
 */
export function SkillsAssessmentPreview({ label, sample, caption }: SkillsAssessmentPreviewProps) {
  return (
    <div className="assessment-preview" aria-hidden="true">
      <p className="assessment-preview-head">
        <span className="assessment-preview-label">{label}</span>
        <span className="assessment-preview-sample">{sample}</span>
      </p>

      <span className="assessment-preview-result">
        <span className="assessment-preview-reel assessment-preview-score">
          {SAMPLE_RESULTS.map(({ score }) => (
            <span key={score}>
              {score}
              <small>/30</small>
            </span>
          ))}
        </span>
        <span className="assessment-preview-reel assessment-preview-level">
          {SAMPLE_RESULTS.map(({ level }) => (
            <span key={level}>{level}</span>
          ))}
        </span>
      </span>

      <span className="assessment-preview-bands">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span className="assessment-preview-marker" />
      </span>

      <p className="assessment-preview-caption">{caption}</p>
    </div>
  );
}
