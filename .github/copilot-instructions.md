# Copilot instructions

- When starting feature work, always create a new git branch before making implementation changes.
- When modifying or adding functionality, update or add relevant test cases to reflect the new behavior.
- Follow object-oriented programming principles consistently, including encapsulation, abstraction, inheritance where appropriate, and composition over inheritance when it improves design.
- Prefer clear class responsibilities, maintainable interfaces, and reusable design patterns over ad hoc implementation.
- Keep changes focused, well-structured, and aligned with the existing project architecture.
- For this repository, keep frontend work consistent with the existing React + TypeScript + Vite structure under frontend/src, especially the organisms/pages/templates/ui component organization.
- Prefer reusable UI components and shared utilities over duplicating logic, especially for forms, layout, and content rendering.
- Preserve the site’s professional marketing focus: keep content, styling, accessibility, and responsive behavior consistent with the current LawGate experience.
- When changing content or pages, keep SEO considerations in mind and avoid breaking metadata, routing, or public asset references.
- For backend changes, keep Azure Functions logic isolated, use environment variables for sensitive configuration, and avoid hardcoding secrets or email targets.
- When touching contact form, email delivery, or reCAPTCHA behavior, verify related documentation and configuration files so deployment remains reliable.
- Maintain TypeScript safety by avoiding unnecessary any usage and keeping interfaces and props well-defined.
- Keep changes compatible with the current toolchain: React 19, TypeScript, Vite, Tailwind CSS, Python 3.11, and Azure Static Web Apps.
