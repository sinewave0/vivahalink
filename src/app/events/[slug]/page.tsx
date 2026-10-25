import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { demoEvents, getInvitationWithTemplate } from "@/data/demo-events";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import InvitationExperience from "@/components/invite/InvitationExperience";
import InvitationLoading from "@/components/invite/InvitationLoading";

/**
 * Invitation demo / shared wedding microsite.
 *
 * Every template in src/data/templates.ts ships with a demo invitation
 * ([slug] = demoSlug), so customers can preview the complete experience
 * before ordering. Real customer invitations will slot into this same
 * route when a persistence layer is added.
 */

export async function generateStaticParams() {
  return demoEvents.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getInvitationWithTemplate(slug);
  if (!data) return {};

  const { invitation, template } = data;
  const names = `${invitation.coupleName1} & ${invitation.coupleName2}`;

  return {
    title: `${names} — ${template.title} Invitation`,
    description: `${invitation.tagline} · ${formatDate(invitation.weddingDate)} · An elegant digital invitation on VivahaLink.`,
    alternates: { canonical: `/events/${slug}` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "VivahaLink",
      url: `${SITE.url}/events/${slug}`,
      title: `${names} — ${template.title} Invitation`,
      description: `${invitation.tagline} · ${formatDate(invitation.weddingDate)}`,
    },
    twitter: {
      card: "summary",
      title: `${names} — Invitation`,
      description: `${invitation.tagline} · ${formatDate(invitation.weddingDate)}`,
    },
  };
}

/**
 * The slug-dependent work lives behind <Suspense> so the route's static
 * shell stays URL-independent and client navigations stay instant
 * (Next.js instant-navigation validation).
 */
async function InvitationRoute({
  params,
  shareUrlBase,
}: {
  params: Promise<{ slug: string }>;
  shareUrlBase: string;
}) {
  const { slug } = await params;
  const data = getInvitationWithTemplate(slug);
  if (!data) notFound();

  const { invitation, template } = data;

  return (
    <InvitationExperience
      invitation={invitation}
      template={template}
      shareUrl={`${shareUrlBase}/${slug}`}
    />
  );
}

export default function InvitationPage(props: PageProps<"/events/[slug]">) {
  return (
    <Suspense fallback={<InvitationLoading />}>
      <InvitationRoute params={props.params} shareUrlBase={`${SITE.url}/events`} />
    </Suspense>
  );
}
