# Copilot Instructions — Blog Article Writing Guide

This repository contains blog articles published at [richardawilson.com](https://www.richardawilson.com) (also thewils.blogspot.com). These instructions define the writing style, tone, structure, and formatting conventions to follow when generating new articles.

---

## Voice & Tone

- Write in **first person** ("I", "my") for narrative and context. Switch to **second person** ("you") when giving instructions.
- Be **conversational but professional** — approachable and friendly, never academic or stiff.
- Position yourself as a **peer sharing discoveries**, not a lecturer teaching from above.
- Share personal experiences, mistakes, and "gotchas" openly with light, genuine humor.
  - ✅ *"It was a silly mistake but one that cost me about an hour of my life which hopefully you can avoid 😀"*
  - ✅ *"I ran into a frustrating issue…"*
  - ✅ *"This ended up causing me a bit of a headache"*
- Offer personal opinions when relevant and frame them as preferences, not mandates.
  - ✅ *"Personally, I prefer using the REST API because…"*
  - ✅ *"I typically choose User-assigned identities regardless, as they provide clearer control"*
- Use emoji sparingly — occasionally in headers or closing remarks (🧠, 🔧, ✅, 😀) but don't overdo it.

---

## Article Structure

Every article **must** begin with a hero image on line 1:

```markdown
![Descriptive Article Title](image-url)
```

### Structure A: Full-Length Guide (complex topics)

1. **Hero image**
2. **Introduction** — 1–2 paragraphs of personal narrative or contextual setup (optionally under `## Introduction`)
3. **Background/Concepts** — brief "What is X?" or "Why does this matter?" section
4. **Step-by-step walkthrough** — numbered steps with headers like `## Step 1: Do the Thing`
5. **Code samples and screenshots** — embedded inline throughout
6. **Best practices or tips** (optional)
7. **Conclusion** — brief summary + encouraging call to action
8. **Additional Resources** (optional) — links to docs, repos, related articles

### Structure B: Quick Problem-Solution (focused fixes)

1. **Hero image**
2. **Problem statement** — 1–2 paragraphs explaining the issue and personal context
3. **Solution** — brief steps or code with screenshots
4. **Closing** — short tip, summary, or call to action

**Match the structure to the topic.** Don't pad short topics into long guides. If a problem-solution covers it in 300 words, that's fine.

---

## Openings

Use one of these opening patterns (always after the hero image):

1. **Personal narrative** — jump into a personal experience or discovery:
   - *"I recently had the opportunity to utilize the new Custom API functionality within Dataverse."*
   - *"While recently walking a colleague through Power Automate, I was reminded of one of my long-standing frustrations…"*

2. **Contextual setup** — establish the problem space:
   - *"Managing IT environments with limited or no internet access presents unique challenges."*
   - *"Navigating travel expenses in the public sector can be intricate, especially when it comes to adhering to per diem rates."*

3. **Direct hook** — question or exclamation:
   - *"Have you ever wanted to fill in a Docx template within a Canvas App? Look no further!"*

---

## Closings

End articles with one of these patterns:

- **Encouraging call to action:**
  - *"Give it a try and let me know your thoughts!"*
  - *"Ready to start building reusable components? Give it a try and enhance your Power Pages experience!"*
  - *"Have questions or insights? Drop your comments below and let's discuss!"*
  - *"Happy designing!"*

- **Summary of key points** (for longer articles):
  - Briefly restate the main takeaway and link back to the practical benefit.

Do **not** end abruptly without at least a one-liner closing. Always leave the reader with a positive, encouraging note.

---

## Technical Content

- **Explain the "what" and "why" briefly, then focus on the "how."** The reader wants a working solution.
- **Assume intermediate knowledge** — the reader knows what Power Platform, Dataverse, Azure, etc. are, but don't assume deep expertise.
- **Link to official Microsoft docs** for foundational setup steps rather than re-explaining them:
  - *"To do this follow the [instructions Microsoft has provided](url)"*
  - *"For more in-depth information, visit the [official page on Microsoft Learn](url)"*
- **Share "gotchas" freely** — personal mistakes, unexpected errors, non-obvious configuration requirements:
  - *"A null reference exception kept being thrown during the registration. I finally realized that I needed to create the Custom API record within my solution before actually attempting to deploy the code."*
- When the topic touches **GCC High, DoD, or air-gapped environments**, call out government-specific considerations explicitly.
- Use analogies for complex concepts:
  - *"AutoGPT is like having a smart robot buddy that helps you achieve a specific goal by chatting with a super smart AI"*

---

## Code Samples

- Use **fenced code blocks** with language identifiers (```powershell, ```html, ```javascript, ```yaml, ```liquid, ```css, etc.).
- Include **complete, working code** — not just fragments. The reader should be able to copy-paste and run.
- Introduce code with a short lead-in:
  - *"Here's the script:"*
  - *"Use the following command:"*
  - *"Copy the following lines:"*
- Follow code blocks with **"Example Usage:"** sections when applicable.
- For multi-step code, break it into separate blocks with explanatory text between each.

---

## Images & Screenshots

- **Every article starts with a hero image** on line 1.
- Embed screenshots inline throughout to show UI steps, error messages, and results.
- Use this markdown format:
  ```markdown
  ![Descriptive alt text](https://github.com/rwilson504/Blogger/assets/...)
  ```
- Place screenshots **after** the descriptive text that references them, not before.
- No captions — the preceding paragraph provides context.
- Use screenshots liberally; a picture of a settings screen or error message is worth a thousand words.

---

## Formatting Conventions

| Element | Usage |
|---|---|
| **Bold** (`**text**`) | Key terms, UI element names, important warnings, parameter names, emphasis |
| Inline code (`` `backticks` ``) | Commands, parameter names, file names, URLs, code references |
| Numbered lists | Step-by-step instructions |
| Bulleted lists | Features, advantages, considerations, options |
| `##` (H2) | Major sections |
| `###` (H3) | Subsections |
| Blockquotes (`>`) | Important callouts and tips: `> ✅ **Important:** ...` |
| Bold labels in lists | **Category:** then explanation — e.g., *"**Advantages:** ... **Considerations:** ..."* |

### Header Patterns

- Step-based: `## Step 1: Configure the Managed Identity`
- Question-based: `## What is AutoGPT?`
- Action-based: `## Setting Up the Environment`
- Emoji headers (use sparingly): `## 🧠 The Fix: PID Tuning`

---

## Common Phrases & Transitions

Use these natural transition patterns:

- *"This guide walks through…"* / *"This article walks through…"*
- *"Let's dive into…"*
- *"Here's how…"* / *"Here's how you can…"*
- *"If you want to…"* / *"If you're looking to…"*
- *"For those interested in…"* / *"For those eager to…"*
- *"I highly recommend giving X a try"*

---

## Topics & Audience

**Primary audience:** Power Platform developers and administrators, especially those in **enterprise and government (GCC High/DoD)** environments.

**Secondary audience:** Microsoft ecosystem developers (Azure, Dataverse, Dynamics 365) and citizen developers using Power Apps/Power Automate.

**Core topic areas:**
- Power Platform (Power Apps, Power Automate, Power Pages, PCF controls, custom connectors)
- Dataverse (Web API, Custom API, security, data access)
- Azure (ADF, OpenAI, Maps, DevOps, Storage, Logic Apps, Functions)
- Government/Public Sector (GCC High, DoD, air-gapped systems, GSA/government APIs)
- Developer Tools (PAC CLI, PowerShell, Git, npm, VS Code)
- AI (Azure OpenAI, AutoGPT, Copilot)
- Occasional maker/hobbyist (3D printing, Raspberry Pi, smart home)

---

## LinkedIn Post

After writing a new article, offer to draft a LinkedIn post to promote it. LinkedIn does **not** support markdown — use plain Unicode text only:

- Use Unicode mathematical bold characters (e.g., 𝗕𝗼𝗹𝗱 𝗧𝗲𝘅𝘁) for emphasis instead of markdown `**bold**`
- Use emoji for visual structure (👇, 🔗, ✅, etc.)
- Use line breaks for readability — no bullet-point markdown
- Wrap inline references in "quotes" instead of backticks
- End with relevant hashtags: #PowerPlatform, #Dataverse, #Azure, etc.
- Include a 🔗 placeholder for the blog post link
- Keep the same conversational, peer-sharing tone as the blog

---

## Anti-Patterns (Things to Avoid)

- ❌ Don't write in a dry, academic, or overly formal tone
- ❌ Don't assume expert-level knowledge without providing context
- ❌ Don't include code snippets that are incomplete or can't run standalone
- ❌ Don't skip the hero image
- ❌ Don't pad short topics with filler content — let the length match the topic
- ❌ Don't skip sharing personal mistakes or gotchas — they're a core part of the value
- ❌ Don't use "we" excessively — prefer "I" for narrative and "you" for instructions
- ❌ Don't forget to link to official documentation for foundational steps
