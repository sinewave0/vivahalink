import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { demoEvents, getInvitationWithTemplate } from "@/data/demo-events";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import InvitationExperience from "@/components/invite/InvitationExperience";
import InvitationLoading from "@/components/invite/InvitationLoading";

/**
 * The short, shareable invitation link promised to customers:
 *   vivahalink.com/invite/<name>
 *
 * It renders the same microsite as /events/[slug]; in v1 both resolve
 * from the demo invitations dataset. When real customer invitations
 * are introduced, this route resolves /invite/<customer-slug>.
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

  const { invitation } = data;
  const names = `${invitation.coupleName1} & ${invitation.coupleName2}`;

  return {
    title: `${names}'s Invitation`,
    description: `${invitation.tagline} · ${formatDate(invitation.weddingDate)}`,
    alternates: { canonical: `/invite/${slug}` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "VivahaLink",
      url: `${SITE.url}/invite/${slug}`,
      title: `${names}'s Invitation`,
      description: `${invitation.tagline} · ${formatDate(invitation.weddingDate)}`,
    },
    twitter: {
      card: "summary",
      title: `${names}'s Invitation`,
      description: `${invitation.tagline} · ${formatDate(invitation.weddingDate)}`,
    },
  };
}

/**
 * The slug-dependent work lives behind <Suspense> so the route's static
 * shell stays URL-independent and client navigations stay instant
 * (Next.js instant-navigation validation).
 */
async function InviteRoute({
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

export default function InvitePage(props: PageProps<"/invite/[slug]">) {
  return (
    <Suspense fallback={<InvitationLoading />}>
      <InviteRoute params={props.params} shareUrlBase={`${SITE.url}/invite`} />
    </Suspense>
  );
}
