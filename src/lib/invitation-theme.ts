import type { InvitationTheme, Template } from "@/lib/types";

const DEFAULT_THEME: InvitationTheme = {
  main: "#7a1636",
  accent: "#e5c02a",
  surface: "#fdfaf4",
  surfaceAlt: "#f5ecd5",
  ink: "#5c1129",
  muted: "#8c6a55",
  petalColors: ["#ec7696", "#cb2a5b", "#f4a8ba", "#f9d0d9", "#e5c02a"],
};

/**
 * Returns palette roles for the invitation UI. Older templates still receive
 * a stable theme, while newer designs can define their own visual language.
 */
export function getInvitationTheme(template: Template): InvitationTheme {
  if (template.theme) return template.theme;

  return {
    ...DEFAULT_THEME,
    main: template.palette[0]?.hex ?? DEFAULT_THEME.main,
    accent: template.palette[1]?.hex ?? DEFAULT_THEME.accent,
  };
}
