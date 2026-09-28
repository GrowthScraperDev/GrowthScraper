export const crmWebhookURL =
  "https://us-central1-dealclosure-crm.cloudfunctions.net/dealConverterCrmWebhook?webhookId=ZotzHif6cVvWofFkpDdV";

// Course name sent as campaign_name, keyed by the page path the form was opened on
const courseCampaigns = {
  "/academy/full-stack-seo-mastery/": "Full Stack SEO Mastery",
  "/academy/performance-marketing-mastery-program/": "AI Performance Marketing",
  "/academy/ai-web-development-mastery-program/": "AI Web Development Mastery",
  "/academy/small-business-marketing-mastery-program/": "Small Business Marketing Mastery",
};

const toTitle = (slug) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function getCampaignName(pathname = "") {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;

  if (courseCampaigns[path]) return courseCampaigns[path];

  // City pages, e.g. /academy/seo-course-in-coimbatore/
  const city = path.match(/^\/academy\/seo-course-in-([a-z-]+)\/$/);
  if (city) return `Full Stack SEO Mastery (${toTitle(city[1])})`;

  return path === "/" ? "Home" : toTitle(path.split("/").filter(Boolean).pop() || "Website");
}
