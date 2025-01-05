// structuredData.ts

export const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Your Company Name",
    "logo": "https://yourcompany.com/logo.png",
    "url": "https://yourcompany.com",
    "description": "We specialize in web app, mobile app development, and UI/UX design.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-123-4567",
      "email": "contact@yourcompany.com"
    }
  };
  
  export const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Web App Development",
    "description": "Custom web application development services.",
    "provider": {
      "@type": "Organization",
      "name": "Your Company Name"
    },
    "serviceType": "Web App Development"
  };
  
  // Add similar objects for other services and products

//   const Home: NextPage = () => {
//     return (
//       <div>
//         <Head>
//           <script
//             type="application/ld+json"
//             dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
//           />
//         </Head>
//         <h1>Welcome to Our Company</h1>
//         {/* Your page content */}
//       </div>
//     );
//   };
  
//   export default Home;