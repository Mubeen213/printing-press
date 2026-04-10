import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
}

/**
 * Lightweight SEO head manager using useEffect.
 * Updates document.title and meta tags without external dependencies.
 */
export function useSEO({ title, description, ogImage, noindex }: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title
      ? siteConfig.seo.titleTemplate.replace('%s', title)
      : siteConfig.seo.defaultTitle;

    document.title = fullTitle;

    setMetaTag('description', description || siteConfig.seo.defaultDescription);
    setMetaTag('og:title', fullTitle, 'property');
    setMetaTag('og:description', description || siteConfig.seo.defaultDescription, 'property');
    setMetaTag('og:type', 'website', 'property');

    if (ogImage) {
      setMetaTag('og:image', ogImage, 'property');
    }

    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description || siteConfig.seo.defaultDescription);

    if (noindex) {
      setMetaTag('robots', 'noindex, nofollow');
    } else {
      removeMetaTag('robots');
    }

    return () => {
      document.title = siteConfig.seo.defaultTitle;
    };
  }, [title, description, ogImage, noindex]);
}

function setMetaTag(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMetaTag(name: string) {
  const el = document.querySelector(`meta[name="${name}"]`);
  if (el) el.remove();
}
