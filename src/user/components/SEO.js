import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const defaultTitle = 'Wing Hobbies - Premium RC Models & Accessories';
  const defaultDescription = 'Shop premium RC planes, helicopters, drones, and cars. Best quality RC models with fast shipping across India.';
  const defaultKeywords = 'RC planes, RC helicopters, drones, RC cars, hobby store, remote control';
  const defaultImage = 'https://winghobbies.com/og-image.jpg';
  const siteUrl = 'https://winghobbies.com';

  return (
    <Helmet>
      <title>{title ? `${title} | Wing Hobbies` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      <link rel="canonical" href={url || siteUrl} />
    </Helmet>
  );
};

export default SEO;
