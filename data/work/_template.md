---
title: "Project Title Here"
company: "COMPANY NAME"
period: "Month Year - Month Year"
type: "Full-time • Part-time • Contract • Intern"
# heroImage: "/images/work/project-hero.jpg"
# heroImageAlt: "Description of hero image"
sidebar:
  - { id: "overview", title: "Overview" }
  - { id: "challenge", title: "Challenge" }
  - { id: "solution", title: "Solution" }
  - { id: "results", title: "Results" }
  - { id: "learnings", title: "Learnings" }
meta:
  description: "A brief description of the project for SEO and social sharing"
  timeline: "Project duration"
  team:
    - "Team Member 1, Role"
    - "Team Member 2, Role"
    - "Team Member 3, Role"
---

# Project Title Here

A compelling one-sentence summary of what you accomplished and the impact you made.

<div id="overview">

## Overview

Brief introduction to the project, company, and your role. Set the context for what the project was about and why it mattered.

### The Company

Brief description of the company, its mission, and its place in the market.

### My Role

Clear description of your specific role and responsibilities on this project.

### The Team

If applicable, mention key team members and how you collaborated.

</div>

<div id="challenge">

## The Challenge

### Business Problem

Describe the core business problem or opportunity that the project addressed.

### User Pain Points

- **Pain Point 1** - Description of the first major user problem
- **Pain Point 2** - Description of the second major user problem  
- **Pain Point 3** - Description of the third major user problem

### Technical Constraints

Any technical limitations or constraints you had to work within.

### Success Metrics

What metrics would define success for this project?

</div>

<div id="solution">

## Our Solution

### Design Process

Brief overview of your design process and methodology.

### Key Features

#### Feature 1: Feature Name

**Problem it solves:** Brief description

**How it works:** Explanation of the feature functionality

**Design decisions:** Key design choices and rationale

#### Feature 2: Feature Name

**Problem it solves:** Brief description

**How it works:** Explanation of the feature functionality

**Design decisions:** Key design choices and rationale

### Design System Work

If you worked on design system components, document them here.

### Technical Implementation

Brief notes on technical considerations or constraints that influenced the design.

</div>

<div id="results">

## Results & Impact

### Key Metrics

- **Metric 1** - Percentage or number improvement with context
- **Metric 2** - Percentage or number improvement with context
- **Metric 3** - Percentage or number improvement with context

### Business Impact

Description of the broader business impact beyond just numbers.

### User Feedback

Notable quotes or feedback from users, if available.

### What We Learned

Key insights gained from the project.

*For confidentiality reasons, some specific metrics and details have been omitted.*

</div>

<div id="learnings">

## Key Learnings & Takeaways

### What Worked Well

- **Learning 1** - Description of what was successful
- **Learning 2** - Description of what was successful
- **Learning 3** - Description of what was successful

### What Could Be Improved

- **Challenge 1** - What you would do differently next time
- **Challenge 2** - What you would do differently next time

### Skills Developed

- Skill or tool you learned/improved
- Another skill or capability gained
- Process or methodology you refined

### Future Opportunities

Ideas for future iterations or related projects.

</div>

---

## Template Usage Guide

### Frontmatter Options

```yaml
---
title: "Required - The main project title"
company: "Required - Company or client name"
period: "Required - Time period (e.g., 'Jan 2023 - Dec 2023')"
type: "Required - Employment type"
heroImage: "Optional - Path to hero image"
heroImageAlt: "Optional - Alt text for hero image"
sidebar:
  - { id: "section-id", title: "Section Name" }
  # Add as many sections as needed
meta:
  description: "Optional - SEO description"
  timeline: "Optional - Additional timeline info"
  team: "Optional - Array of team members"
---
```

### Section Structure

Each major section should be wrapped in a `<div>` with a unique `id` that matches your sidebar configuration:

```html
<div id="section-name">

## Section Title

Content goes here...

</div>
```

### Available Components

#### Lists with Auto-Generated Cards

When you create a list right after an `h3` heading, it automatically becomes a card layout:

```markdown
### Results

- **32% increase** in user engagement
- **50% reduction** in load times  
- **$2M revenue** generated in first quarter
```

#### Blockquotes for Important Statements

```markdown
> What do you think the purpose of design is?

> How have you worked with design in the past?

> What should the immediate responsibility of the design team be?
```

#### Strong Text for Emphasis

```markdown
**Business need:** Use for highlighting key concepts

**Goal:** Use for important objectives

**Role:** Use for defining responsibilities
```

#### Links

```markdown
[Contact me](mailto:your@email.com) for more details about this project.
```

### Best Practices

1. **Keep it scannable** - Use clear headings and bullet points
2. **Tell a story** - Structure your content with a clear beginning, middle, and end
3. **Show impact** - Always include concrete results and metrics
4. **Be honest** - Acknowledge challenges and learnings
5. **Respect confidentiality** - Use placeholders for sensitive information
6. **Use consistent structure** - Follow the template structure for easier navigation

### Sidebar Navigation

The sidebar automatically generates from your frontmatter `sidebar` array. Each item needs:

- `id`: Must match a `<div id="...">` in your content
- `title`: Display name in the sidebar

### Images

Place images in `/public/images/work/` and reference them like:

```markdown
![Alt text](/images/work/project-name/image.jpg)
```

For hero images, add to frontmatter:

```yaml
heroImage: "/images/work/project-hero.jpg"
heroImageAlt: "Descriptive alt text"
```

---

*This template provides a consistent structure for showcasing your work while maintaining flexibility for different types of projects.*
