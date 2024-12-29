import React from 'react';
import { PortableText } from '@portabletext/react'; // Ensure you have the correct import
import Text from './Text'; // Adjust the import based on your project structure

// Define the type for the post
interface Post {
  body: Array<any>; // Replace 'any' with the specific type if known
}

// Define the props for the StyledBodyText component
interface StyledBodyTextProps {
  post: Post;
  locale: string;
}

const StyledBodyText: React.FC<StyledBodyTextProps> = ({ post, locale }) => {
  return (
    <PortableText
      value={post.body} // Assuming post is an object with a body property
      components={{
        block: {
          normal: ({ children }) => <Text locale={locale} className="mb-4">{children}</Text>,
          h1: ({ children }) => <Text locale={locale} variant="h1" className="mb-4">{children}</Text>,
          h2: ({ children }) => <Text locale={locale} variant="h2" className="mb-4">{children}</Text>,
          h3: ({ children }) => <Text locale={locale} variant="h3" className="mb-4">{children}</Text>,
          h4: ({ children }) => <Text locale={locale} variant="h4" className="mb-4">{children}</Text>,
          h5: ({ children }) => <Text locale={locale} variant="h5" className="mb-4">{children}</Text>,
          h6: ({ children }) => <Text locale={locale} variant="h6" className="mb-4">{children}</Text>,
        },
        list: {
          bullet: ({ children }) => (
            <ul className="mt-xl list-disc pl-5">
              {children}
            </ul>
          ),
          number: ({ children }) => (
            <ol className="mt-lg list-decimal pl-5">
              {children}
            </ol>
          ),
        },
        listItem: {
          bullet: ({ children }) => (
            <li className="mb-2">
              <Text locale={locale} className="mb-4">{children}</Text>
            </li>
          ),
          number: ({ children }) => (
            <li className="mb-2">
              <Text locale={locale} className="mb-4">{children}</Text>
            </li>
          ),
        },
        // Handling inline elements like span
        marks: {
          strong: ({ children }) => <strong>{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
          span: ({ children, value }) => (
            <span className={value.className}>{children}</span> // Assuming value contains className for styling
          ),
          // Add more marks as needed
        },
      }}
    />
  );
};

export default StyledBodyText;