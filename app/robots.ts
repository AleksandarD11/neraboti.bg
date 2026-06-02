import { MetadataRoute } from "next";
import { absoluteUrl, shouldIndex } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const indexable = shouldIndex();

  return {
    rules: {
      userAgent: "*",
      allow: indexable ? "/" : undefined,
      disallow: indexable ? ["/api/"] : "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
