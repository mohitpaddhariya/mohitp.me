import { useEffect } from "react";

const GoogleAnalytics = ({ googleAnalytics }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", googleAnalytics);
    };
  }, []);

  return null;
};

export default GoogleAnalytics;