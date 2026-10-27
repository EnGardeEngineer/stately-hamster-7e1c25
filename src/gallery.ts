/// <reference types="vite/client" />
// Bottom-of-page gallery: loads every image in src/assets/gallery/, sorted by file name.
// Keep it tight (7 photos fills the grid exactly). To swap a photo, replace the file and
// optionally update its caption below. Photos placed elsewhere on the page live in src/assets/photos/.

import classDrills from './assets/photos/class-drills.jpg'
import coachApplause from './assets/photos/coach-applause.jpg'
import coachFeedback from './assets/photos/coach-feedback.jpg'
import ellisSiblings from './assets/photos/ellis-siblings-grand-prix.jpg'
import grandPrixBout from './assets/photos/grand-prix-bout.jpg'
import moroccoCamp from './assets/photos/morocco-camp.jpg'
import schoolLunges from './assets/photos/school-lunges.jpg'
import schoolTeam from './assets/photos/school-team.jpg'

export type Photo = { src: string; alt: string }

const files = import.meta.glob('./assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const captions: Record<string, string> = {
  '01-high-five.jpg': 'Good touch, good bout',
  '02-coaching-on-strip.jpg': 'Coaching on the strip',
  '03-student-gear-check.jpg': 'Pre-bout equipment check',
  '04-hook-up.jpg': 'Hooking up for electric scoring',
  '05-post-bout-talk.jpg': 'Post-bout debrief',
  '06-coach-walkthrough.jpg': 'Walking through tactics between bouts',
  '07-coaches-ready.jpg': 'Coaches preparing fencers for competition',
}

export const galleryPhotos: Photo[] = Object.keys(files)
  .sort()
  .map((path) => {
    const name = path.split('/').pop() ?? path
    return { src: files[path], alt: captions[name] ?? 'Atlas Lions Fencing training session' }
  })

// Photos placed through the page
export const programPhotos: Photo[] = [
  { src: classDrills, alt: 'A full class running drills together' },
  { src: coachFeedback, alt: 'A coach giving one-on-one feedback' },
  { src: moroccoCamp, alt: 'Athletes and coaches at a training camp in Morocco' },
]

export const scholasticStrip: Photo[] = [
  { src: schoolLunges, alt: 'Students practicing lunges in a partner school' },
  { src: schoolTeam, alt: 'A scholastic team with Atlas Lions coaches' },
  { src: coachApplause, alt: 'A coach celebrating a student’s touch' },
]

export const pedigreePhotos: Photo[] = [
  { src: ellisSiblings, alt: 'Co-founders Sarah and Yehia Ellis competing for Morocco at a Grand Prix' },
  { src: grandPrixBout, alt: 'International bout for Team Morocco' },
]
