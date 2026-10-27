# Dusk redesign (preview snapshot)

This folder is the aesthetic pass built in the Grok preview: dusk temple cover, paper cards, gold thread, sample invitation, and template gallery.

It is a TanStack Start snapshot, not a drop-in replacement for the Next.js app on `main`. Routes still import the preview shell (`@/lib/auth`, preview bridge). Use it as the visual reference, or merge pieces into `src/components` when you want this look on the live Next site.

**Status: merged into the live Next.js app on the `dusk-redesign` branch.** The dusk cover, seal reveal, lantern field, kolam/duo photographic interludes, and paper-card styling now live in `src/app/globals.css` + `src/components/{ui,invite,home}` (see `DuskCover.tsx`, `InvitationGate.tsx`). The rich filterable template grid from the live app was kept in favour of this snapshot's minimal list.

Images live in `redesign/public/images/`; the four dusk photographs used by the live site are copied to `public/images/atelier/`.
