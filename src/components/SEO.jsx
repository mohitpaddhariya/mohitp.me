import React from "react";

const SEO = ({ title, description, keywords, ogImage, canonical, ogDescription, ogLocale }) => {
    React.useEffect(() => {
        // Update document title
        document.title = title;

        // Update meta tags
        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);
        updateMetaTag('og:title', title);
        updateMetaTag('og:description', ogDescription);
        updateMetaTag('og:locale', ogLocale);
        updateMetaTag('og:image', ogImage);
        updateMetaTag('og:image:width', '1200');
        updateMetaTag('og:image:height', '630');
        updateMetaTag('og:imgage:alt', title);
        updateMetaTag('og:type', 'website');

        updateMetaTag('og:url', canonical);
        updateMetaTag('twitter:title', title);
        updateMetaTag('twitter:description', ogDescription);
        updateMetaTag('twitter:image', ogImage);
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:creator', title);
        updateMetaTag('twitter:site', title);

        // Update canonical link
        updateCanonicalLink(canonical);

        // Add schema markup
        addSchemaMarkup();
    }, [title, description, keywords, ogImage, canonical]);

    const updateMetaTag = (name, content) => {
        let meta = document.querySelector(`meta[name="${name}"]`) ||
            document.querySelector(`meta[property="${name}"]`);

        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(name.includes('og:') ? 'property' : 'name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    };

    const updateCanonicalLink = (href) => {
        let link = document.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', href);
    };

    const addSchemaMarkup = () => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Mohit Paddhariya",
            "url": canonical,
            "sameAs": [
                "https://github.com/dev-mohit06",
                "https://linkedin.com/in/mohit-paddhariya"
            ]
        };

        let scriptTag = document.querySelector('script[type="application/ld+json"]');
        if (!scriptTag) {
            scriptTag = document.createElement('script');
            scriptTag.type = 'application/ld+json';
            document.head.appendChild(scriptTag);
        }
        scriptTag.textContent = JSON.stringify(schema);
    };

    return null;
};

export default SEO;