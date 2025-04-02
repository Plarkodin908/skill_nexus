
import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
}

const SEOHead = ({
  title = "Skill Nexus - Community-Driven Learning Platform",
  description = "Share knowledge, build skills, and grow together on our community-driven learning platform. Connect with experts and learn new skills today.",
  canonicalUrl = "https://skillnexus.example.com",
  ogType = "website",
  ogImage = "/lovable-uploads/609db0c7-2e29-405b-ad44-bee4b401e14e.png"
}: SEOHeadProps) => {
  const fullTitle = title.includes("Skill Nexus") ? title : `${title} | Skill Nexus`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEOHead;
