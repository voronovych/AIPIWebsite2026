import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // Contact form submissions
  ContactSubmission: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      company: a.string(),
      phone: a.phone(),
      message: a.string().required(),
      service: a.enum(["CONSULTING", "FUNDRAISING", "IP_STRATEGY", "OTHER"]),
      status: a.enum(["NEW", "IN_PROGRESS", "RESOLVED"]),
    })
    .authorization((allow) => [
      allow.guest().to(["create"]),
      allow.authenticated().to(["read", "update", "delete"]),
    ]),

  // Blog / insights posts for SEO content
  BlogPost: a
    .model({
      title: a.string().required(),
      slug: a.string().required(),
      excerpt: a.string(),
      content: a.string().required(),
      author: a.string().required(),
      publishedAt: a.datetime(),
      tags: a.string().array(),
      published: a.boolean().default(false),
      metaTitle: a.string(),
      metaDescription: a.string(),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),

  // Case studies / success stories
  CaseStudy: a
    .model({
      title: a.string().required(),
      slug: a.string().required(),
      client: a.string(),
      industry: a.string(),
      challenge: a.string().required(),
      solution: a.string().required(),
      results: a.string().required(),
      published: a.boolean().default(false),
      metaTitle: a.string(),
      metaDescription: a.string(),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),

  // Team members
  TeamMember: a
    .model({
      name: a.string().required(),
      role: a.string().required(),
      bio: a.string(),
      imageUrl: a.url(),
      linkedIn: a.url(),
      order: a.integer().default(0),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
