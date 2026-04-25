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
    const fullDescription = description || siteConfig.seo.defaultDescription;
    const url = window.location.href;

    document.title = fullTitle;

    setMetaTag('description', fullDescription);
    
    // Open Graph
    setMetaTag('og:title', fullTitle, 'property');
    setMetaTag('og:description', fullDescription, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:url', url, 'property');
    setMetaTag('og:site_name', siteConfig.brand.name, 'property');

    if (ogImage) {
      setMetaTag('og:image', ogImage.startsWith('http') ? ogImage : `${siteConfig.seo.url}${ogImage}`, 'property');
    }

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', fullDescription);
    if (siteConfig.social.twitter && siteConfig.social.twitter !== '#') {
      setMetaTag('twitter:site', `@${siteConfig.social.twitter.split('/').pop()}`);
    }

    // Canonical
    setLinkTag('canonical', url);

    // Robots
    if (noindex) {
      setMetaTag('robots', 'noindex, nofollow');
    } else {
      removeMetaTag('robots');
    }

    // JSON-LD Organization Schema
    updateSchemaMarkup({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.brand.name,
      url: siteConfig.seo.url,
      logo: `${siteConfig.seo.url}${siteConfig.brand.logo}`,
      description: siteConfig.brand.shortDescription,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: `+${siteConfig.whatsapp.number}`,
        contactType: 'customer service',
      },
    });

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
  const el = document.querySelector(`meta[name="robots"]`);
  if (el) el.remove();
}

function setLinkTag(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function updateSchemaMarkup(data: object) {
  let el = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}
