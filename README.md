# Atlas Lions Fencing

A premium single-page website for Atlas Lions Fencing, a distributed academy bringing elite coaching to New York City schools, private athletes, and future corporate teams.

## Experience

- Full-viewport editorial hero with dual parent and school-partner calls to action
- Interactive academy map with scholastic, private, and future flagship pathways
- Responsive program cards for residencies, private coaching, and camps
- Structured coaching-pedigree presentation with compliance and safety signals
- School partnership inquiry modal with complete loading, success, and error states
- Executive events waitlist for the planned 2027 launch
- Mobile navigation, accessible labels, keyboard dismissal, and reduced-motion support

## Technology

- TanStack Start
- React 19 and TypeScript
- TanStack Router
- Vite and Tailwind CSS 4
- Netlify Forms
- Lucide React icons

## Run Locally

```bash
npm install
npm run dev
```

The Vite development server runs on port `3000`. For Netlify platform emulation, use:

```bash
netlify dev --port 8889
```

Netlify Forms are registered through `public/__forms.html` and work after deployment to Netlify.

## Project Structure

```text
public/images/          Local fencing photography
public/__forms.html     Netlify form registration
src/routes/index.tsx   Main page and interactions
src/routes/__root.tsx  Metadata and document shell
src/styles.css         Full visual system and responsive behavior
```

## Pre-Launch Content

The build intentionally avoids fabricating missing founder names, phone numbers, venue addresses, and compliance-document URLs. Confirm those items, all staff credentials, and official membership language before production launch.

Editorial fencing photography is sourced from Augusto Bizzi via Wikimedia Commons and is credited in the site footer.
