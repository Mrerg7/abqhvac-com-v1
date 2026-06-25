import { z, defineCollection } from 'astro:content';

const siteCollection = defineCollection({
  type: 'data',
  schema: z.object({
    domain: z.string(),
    domainDisplay: z.string(),
    price: z.string(),
    priceNumeric: z.number(),
    email: z.string(),
    heroImage: z.string(),
    disclaimer: z.string(),
    location: z.string(),
    trustBadge: z.string(),
    trustPoints: z.array(z.string()),
    heroHeadline: z.string(),
    heroDescription: z.string(),
    whyHeadline: z.string(),
    whySubheadline: z.string(),
    valueCards: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      body: z.string(),
    })),
    domainDetails: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })),
    targetBuyers: z.array(z.string()),
    pricingIncludes: z.array(z.string()),
    ctaEmailSubject: z.string(),
    footerLinks: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),
  }),
});

export const collections = {
  site: siteCollection,
};
