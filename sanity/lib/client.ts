import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})




// import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true,
//   perspective: 'published'
// })

// import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true,
//   stega :{
//     studioUrl: process.env.NODE_ENV === 'production' ? `https://${process.env.VERCEL_URL}/studio` : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,

//   }// Set to false if statically generating pages, using ISR or tag-based revalidation
// })