import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://pratikmaurya.com', // Jab real domain loge tab isko update kar dena
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}