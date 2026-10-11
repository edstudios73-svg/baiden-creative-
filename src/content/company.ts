/*
 * Company copy. Mission, vision and values are drafted for this release and should be
 * approved by the founders (see README → "Needs company input").
 */

export const processSteps = [
  { n: "01", title: "Discover", body: "We learn how your business works, who it serves and what is getting in the way." },
  { n: "02", title: "Define", body: "We agree on objectives, scope, priorities and what success looks like, in writing." },
  { n: "03", title: "Design", body: "We set the visual direction and shape the experience, reviewing it with you as it develops." },
  { n: "04", title: "Build", body: "We engineer and test the solution on the devices and browsers your audience uses." },
  { n: "05", title: "Launch", body: "We prepare the release: hosting, search, analytics and handover, then deploy." },
  { n: "06", title: "Evolve", body: "Where ongoing support is agreed, we keep improving it based on how it's actually used." },
] as const;

export const mission =
  "To give ambitious businesses design and technology that work as hard as they do: clear, well built and made to last.";

export const vision =
  "A creative and technology company from Accra that ambitious founders and companies anywhere choose for its imagination, its craft and its reliability.";

export const philosophy = [
  {
    title: "Imagination with a job to do",
    body: "Ideas earn their place when they help someone understand, decide or act. We look for the idea that does both: memorable and useful.",
  },
  {
    title: "Design and engineering in one room",
    body: "The people who design the experience also build it, so details survive from the first sketch to the finished product.",
  },
  {
    title: "Proof over promises",
    body: "We show real work and say plainly what is live, what is in development and what we haven't done yet.",
  },
] as const;

export const values = [
  { title: "Clarity", body: "Plain language, clear scope and no surprises, from the brief to the invoice." },
  { title: "Craft", body: "Typography, spacing, performance and accessibility are details we care about, because users feel them." },
  { title: "Ownership", body: "We build products of our own, so we treat clients' products with the same responsibility." },
  { title: "Range", body: "Brand, interface, code and motion under one roof, so the work stays consistent." },
] as const;
