import { useEffect } from "react";
import siteConfig from "../config/site.js";

const upsertMeta = (selector, attrs) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLink = (selector, attrs) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const Seo = ({ title, description, image, url, noIndex = false }) => {
  useEffect(() => {
    const pageTitle = title
      ? `${title} | ${siteConfig.name}`
      : siteConfig.name;
    const pageDescription = description || siteConfig.description;
    const pageUrl = url || siteConfig.url;
    const pageImage = image || `${siteConfig.url}${siteConfig.ogImage}`;

    document.title = pageTitle;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: pageDescription,
    });

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: pageTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: pageDescription,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: pageUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: pageImage,
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: pageTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: pageDescription,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: pageImage,
    });
    upsertMeta('meta[name="twitter:site"]', {
      name: "twitter:site",
      content: siteConfig.twitterHandle,
    });

    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex,nofollow" : "index,follow",
    });

    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: pageUrl,
    });
  }, [title, description, image, url, noIndex]);

  return null;
};

export default Seo;
