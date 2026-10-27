// Gallery photos load automatically from src/assets/gallery/.
// To add a photo: drop a .jpg/.jpeg/.png/.webp into that folder (ideally under ~1600px wide)
// and redeploy. Files sort by name, so prefix with a number (e.g. "21-camp-day.jpg") to set the order.
// Optional: add a caption below, keyed by file name. Photos without one get a generic caption.

const files = import.meta.glob('./assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const captions: Record<string, string> = {
  '01-class-footwork.jpg': 'Footwork drills with a full class',
  '02-school-lunges.jpg': 'Lunge practice in a partner school gym',
  '03-coach-feedback.jpg': 'One-on-one feedback between touches',
  '04-ellis-siblings-grand-prix.jpg': 'Co-founders Sarah and Yehia Ellis at a Grand Prix',
  '05-street-clinic-gear-up.jpg': 'Gearing up a first-time fencer at a community street clinic',
  '06-student-gear-check.jpg': 'Pre-bout equipment check',
  '07-school-team.jpg': 'Scholastic team with Atlas Lions coaches',
  '08-high-five.jpg': 'Good touch, good bout',
  '09-school-lineup.jpg': 'Scholastic fencers ready to start',
  '10-coaching-on-strip.jpg': 'Coaching on the strip',
  '11-first-salute.jpg': 'A first salute',
  '12-class-drills.jpg': 'Group drills, every athlete moving',
  '13-grand-prix-bout.jpg': 'International bout for Team Morocco',
  '14-coach-applause.jpg': 'Celebrating a student’s touch',
  '15-street-clinic-bout.jpg': 'First bouts at a community street clinic',
  '16-post-bout-talk.jpg': 'Post-bout debrief',
  '17-morocco-camp.jpg': 'Training camp in Morocco',
  '18-coaches-ready.jpg': 'Coaches preparing fencers for competition',
  '19-street-clinic-first-touch.jpg': 'Kids trying fencing for the first time',
  '20-hook-up.jpg': 'Hooking up for electric scoring',
}

export type GalleryPhoto = { src: string; alt: string }

export const galleryPhotos: GalleryPhoto[] = Object.keys(files)
  .sort()
  .map((path) => {
    const name = path.split('/').pop() ?? path
    return { src: files[path], alt: captions[name] ?? 'Atlas Lions Fencing training session' }
  })
