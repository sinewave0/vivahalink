import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { demoEvents, getInvitationWithTemplate } from "@/data/demo-events";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import InvitationExperience from "@/components/invite/InvitationExperience";

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
  };
}

export default async function InvitationPage(props: PageProps<"/events/[slug]">) {
  const { slug } = await props.params;
  const data = getInvitationWithTemplate(slug);
  if (!data) notFound();

  const { invitation, template } = data;

  return (
    <InvitationExperience
      invitation={invitation}
      template={template}
      shareUrl={`${SITE.url}/events/${slug}`}
    />
  );
}
