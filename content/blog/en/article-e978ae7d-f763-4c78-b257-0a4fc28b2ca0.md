---
{
  "id": "opp_e978ae7d-f763-4c78-b257-0a4fc28b2ca0",
  "locale": "en",
  "slug": "article-e978ae7d-f763-4c78-b257-0a4fc28b2ca0",
  "urlSlug": "n8n-2-43-release-notes-browser-use-now-on-for-everyone",
  "publishedAt": "2026-10-09T05:20:55.210Z",
  "title": "n8n 2.43 Release Notes: Browser Use Now On for Everyone",
  "subtitle": "n8n 2.43 release notes make Browser Use available to everyone and change its defaults; here's what changed, who it affects, and what's not stated.",
  "description": "n8n 2.43 release notes make Browser Use available to everyone and change its defaults; here's what changed, who it affects, and what's not stated.",
  "date": "2026-10-09",
  "sourcesCheckedAt": "2026-10-09T05:02:31.778Z",
  "tags": [
    "Updates",
    "n8n",
    "AI automation",
    "Production readiness"
  ],
  "coverImage": "/blog/en/article-e978ae7d-f763-4c78-b257-0a4fc28b2ca0/a4d6e783390b12dfce06a73d7c025be50b6f700bb3d7090f3ef98df495518630.png",
  "coverAlt": "A browser window steps past a rope barrier onto a stage, illustrating the n8n 2.43 release notes headline change.",
  "seo": {
    "title": "n8n 2.43 Release Notes: Browser Use Now On for Everyone",
    "description": "n8n 2.43 release notes make Browser Use available to everyone and change its defaults; here's what changed, who it affects, and what's not stated.",
    "keywords": [
      "n8n 2.43 release notes",
      "n8n Browser Use feature",
      "n8n new features update",
      "n8n October 2026 update"
    ]
  },
  "revision": "bf46792b71183d94ea4bb8f00b288b39863e092b9308c8ed9ebe19f1adc2abd2"
}
---

## What n8n 2.43 Release Notes Cover, and When It Shipped

n8n 2.43 release notes describe a single dated update: n8n's official changelog lists version 2.43, released October 6, 2026, with Browser Use becoming available to all users as the headline item among a total of 14 changes bundled into this n8n October 2026 update.

GitHub's own release listing for the n8n repository shows the 2.43.0 tag published on October 6, matching the changelog's date, and marks it as a Pre-release rather than a general release.

Sources: [Release notes | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes>), [Releases · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/releases>)

If you don't yet have an n8n workspace to try Browser Use in once it reaches your instance, this partner link opens n8n's own sign-up page for n8n Cloud, where you can create a workspace and watch for this setting as it rolls out.

**[Sign up for n8n Cloud](https://n8n-challenges.app/n8n-sign-up)**

## The Headline Change: Browser Use Moves From Experiment to Default-On

![A toggle switch set to on connects to a browser window icon while a crossed-out phone and tablet sit to the side.](/blog/en/article-e978ae7d-f763-4c78-b257-0a4fc28b2ca0/a0f644e3e52a5f9b9a6bf73b3c22b3514bfaca0268fe5e3946c7874e12927bae.png)

A glowing toggle set to on sits beside a browser-window icon, with a crossed-out phone and tablet to one side.

The centerpiece of this release is the n8n Browser Use feature inside the n8n Assistant. n8n 2.43 turns Browser Use on for every user instead of keeping it behind an experiment flag, and it is now governed by a new instance admin setting, N8N_INSTANCE_AI_BROWSER_USE_ENABLED, which the release notes describe as on by default.

Two related details sit next to that change. The feature still does not work on phones or tablets, including iPads in desktop mode, and the automatic credential-setup option that used to be part of the experiment is now switched off by default for everyone, though n8n's notes say the underlying code stays in place for a possible future return.

We think moving an AI browsing feature from opt-in experiment to on-by-default is the right default for a workflow builder: most teams never flip experimental flags, so leaving Browser Use hidden behind one would have meant most users never saw it at all.

n8n has described the wider [n8n Assistant](<https://n8n-challenges.app/en/blog/n8n-ai-workflow-builder-beta-what-it-built-and-why-n8n-says-its-been-replaced>), the surface that now carries Browser Use for all users, as a tool where someone describes an automation in plain language and the assistant plans it, builds it on the canvas, and helps run and debug it; that description predates 2.43 and does not name Browser Use directly, so it is used here only as background to what the Assistant already did.

Sources: [Release notes | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes>), [Introducing n8n Assistant – n8n Blog](<https://blog.n8n.io/introducing-n8n-assistant/>)

## What Else Changed Alongside Browser Use

Browser Use is the headline, but it travels with 13 other changes in the n8n 2.43 release notes, together forming this n8n new features update's 14 total items. This article stays focused on Browser Use, since that is the one change the release notes call out by name in the version title; the rest sit in the changelog as a flat list that n8n does not group by theme, and this article does not attempt to summarize each one.

Sources: [Release notes | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes>)

Keeping a team current on fast-moving changes like this one, including a new admin setting most teams won't notice until it affects them, is easier with a standing resource than with one-off reading. Our n8n Office Hours / Coaching program gives your team a recurring space, built around your own n8n instance, to work through exactly this kind of release change. Ask about it on our For companies page, which lists our training programs.

**[Ask about n8n training](https://n8n-challenges.app/en/companies)**

## Is n8n 2.43 the Stable Release Yet?

![A stone level rests on solid ground beside a wooden level balanced on scaffolding, showing stable versus beta.](/blog/en/article-e978ae7d-f763-4c78-b257-0a4fc28b2ca0/9e852f189a8055e9824c679767010b53e4ba6a6ccf0181149b0694c43554b6c7.png)

A sturdy stone level rests on solid ground beside a lighter wooden level balanced on a half-built scaffold.

At the time this page was checked, n8n's own release-notes listing showed 2.43 marked as the current beta release, while 2.42.5 was still shown as the [current stable release](<https://n8n-challenges.app/en/blog/n8n-current-version-when-and-how-should-a-self-hosted-team-upgrade>). That means 2.43 had not yet been promoted to the stable channel at that point.

GitHub's release list for the n8n repository backs that up: the 2.43.0 tag is labeled a Pre-release rather than a general release, consistent with n8n's own beta designation for this version line.

**Where n8n 2.43 stood on its release channels**

| Source | What it showed | Status label |
| --- | --- | --- |
| n8n release notes page | 2.43 listed as current beta; 2.42.5 shown as current stable | Beta |
| GitHub releases for the n8n repository | 2.43.0 tag published October 6 | Pre-release |

We'd treat a Pre-release tag and a beta label the same way we treat any staging build: useful to explore now, risky to assume will behave identically once it reaches the stable channel.

Sources: [Release notes 2.x | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes-2.x>), [Releases · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/releases>)

## What the n8n 2.43 Announcement Does Not Say

The n8n 2.43 release notes do not state whether Browser Use, or any of the other 13 changes, behaves the same way on n8n Cloud, on a self-hosted instance, and on Enterprise, or whether it reaches every hosted plan at the same time. That is left unstated rather than implied one way or the other.

The notes also do not explain what a Pre-release GitHub tag or a beta channel label practically means for someone running n8n in production versus someone testing it separately. This is noted as something the announcement itself does not cover, not as a gap to fill in with a guess.

Sources: [Release notes | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes>), [Release notes 2.x | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes-2.x>), [Releases · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/releases>)

## What to Do Now With n8n 2.43

n8n's 2.43 release notes describe what changed; they do not tell readers how to roll it out. The checklist below is this article's own editorial suggestion, not advice stated by n8n itself.

- [ ] Check the N8N_INSTANCE_AI_BROWSER_USE_ENABLED setting before assuming Browser Use is opt-in on your instance.
- [ ] Review the other 13 items in the same release notes entry for ones that touch nodes or integrations your team already uses.
- [ ] Try Browser Use on a non-production instance first, since n8n's own release-notes page showed 2.43 as beta rather than stable at time of writing.
- [ ] Watch the GitHub release page for when the Pre-release tag is replaced by a general release if you want confirmation it has reached the stable channel.

In our view, trying a new default feature like this on a side instance before leaning on it for client-facing work is the sensible middle ground between ignoring it and trusting a beta build blindly.

Sources: [Release notes | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes>), [Release notes 2.x | Changelog | n8n Docs](<https://docs.n8n.io/changelog/release-notes-2.x>), [Releases · n8n-io/n8n · GitHub](<https://github.com/n8n-io/n8n/releases>)

Deciding whether a newly default-on, still-beta feature belongs in your production instance is exactly the kind of question a Workflow Audit answers: a review of your n8n instance and workflows for reliability, security and maintainability before you turn new defaults on. Our For companies page describes this program; enquiries go through the LinkedIn link there.

**[Review your upgrade readiness](https://n8n-challenges.app/en/companies)**

Tags: Updates, n8n, AI automation, Production readiness
