'use client'

import dynamic from 'next/dynamic'

const IconComponent = dynamic(() => import('@iconify/react').then(mod => mod.Icon), {
  loading: () => <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />,
  ssr: false
});

export default function IconClient(props: any) {
  return <IconComponent {...props} />;
}