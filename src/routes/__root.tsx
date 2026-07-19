import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Atlas Lions Fencing | Elite Fencing Across New York City',
      },
      {
        name: 'description',
        content:
          'Atlas Lions Fencing delivers elite scholastic residencies, private coaching, and intensive fencing camps across New York City.',
      },
      {
        name: 'theme-color',
        content: '#080a0b',
      },
      {
        property: 'og:title',
        content: 'Atlas Lions Fencing | Elite Fencing Across New York City',
      },
      {
        property: 'og:description',
        content:
          'Elite scholastic residencies, private coaching, and intensive fencing camps across New York City.',
      },
    ],
    links: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
