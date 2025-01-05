import  db  from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    // Verify webhook secret from Sanity dashboard
    const headersList = await headers();
    const secret = headersList.get('sanity-webhook-secret');
    
    if (secret !== SANITY_WEBHOOK_SECRET) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Parse the webhook payload
    const { _type, slug, operation } = await req.json();
    
    // Only process post documents
    if (_type !== 'post') {
      return new NextResponse('Not a blog post', { status: 200 });
    }

    // Get the slug value from Sanity's structure
    const blogSlug = slug?.current;
    if (!blogSlug) {
      return new NextResponse('No slug provided', { status: 400 });
    }

    // Handle different operations
    switch (operation) {
      case 'create':
        // Create initial database record for the blog post
        await db.blogvisitor.create({
          data: {
            blogSlug,
            counter: 0
          }
        });
        break;

      case 'update':
        // Ensure database record exists
        await db.blogvisitor.upsert({
          where: { blogSlug },
          create: {
            blogSlug,
            counter: 0
          },
          update: {} // No changes needed if exists
        });
        break;

      case 'delete':
        // Optionally remove the counter when post is deleted
        await db.blogvisitor.delete({
          where: { blogSlug }
        }).catch(() => {
          // Ignore if record doesn't exist
        });
        break;
    }

    // Revalidate the blog pages
    revalidateTag('blog');

    return new NextResponse('Success', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }), 
      { status: 500 }
    );
  }
}