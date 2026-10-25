import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { demoEvents, getInvitationWithTemplate } from "@/data/demo-events";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import InvitationExperience from "@/components/invite/InvitationExperience";

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
  };
}

export default async function InvitePage(props: PageProps<"/invite/[slug]">) {
  const { slug } = await props.params;
  const data = getInvitationWithTemplate(slug);
  if (!data) notFound();

  const { invitation, template } = data;

  return (
    <InvitationExperience
      invitation={invitation}
      template={template}
      shareUrl={`${SITE.url}/invite/${slug}`}
    />
  );
}
