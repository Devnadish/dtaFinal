import React from 'react';
import { PortableText } from '@portabletext/react';
import Text from './Text';
import type { Post as SanityPost } from '@/sanity.types';

interface StyledBodyTextProps {
  post: SanityPost;
  locale: string;
}

const StyledBodyText: React.FC<StyledBodyTextProps> = ({ post, locale }) => {
  if (!post.body) {
    return null; // or a placeholder
  }

  return (
    <PortableText
      value={post.body}
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
        marks: {
          strong: ({ children }) => <strong>{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
          span: ({ children, value }) => (
            <span className={value.className}>{children}</span>
          ),
        },
      }}
    />
  );
};

export default StyledBodyText;