'use client'

import { useState } from 'react'
import { FAQItem } from './FAQItem'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icon } from '@iconify/react'
import { FAQ, SortConfig, SortOption } from '@/type/faq'

interface FAQListProps {
  faqs: FAQ[] | null
}

export function FAQList({ faqs }: FAQListProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'createdAt', direction: 'desc' })

  if (!faqs || !Array.isArray(faqs)) {
    return <div>No FAQs available.</div>
  }

  const sortedFAQs = [...faqs].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const handleSortChange = (option: SortOption) => {
    setSortConfig(prevConfig => ({
      key: option,
      direction: prevConfig.key === option && prevConfig.direction === 'desc' ? 'asc' : 'desc'
    }))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">FAQs</h2>
        <div className="flex items-center space-x-2">
          <Select
            value={sortConfig.key}
            onValueChange={(value: SortOption) => handleSortChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date Created</SelectItem>
              <SelectItem value="viewerCount">View Count</SelectItem>
              <SelectItem value="loveCount">Love Count</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleSortChange(sortConfig.key)}
          >
            <Icon
              icon={sortConfig.direction === 'asc' ? 'mdi:sort-ascending' : 'mdi:sort-descending'}
              className="h-4 w-4"
            />
            <span className="sr-only">
              {sortConfig.direction === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
            </span>
          </Button>
        </div>
      </div>
      {sortedFAQs.map(faq => (
        <FAQItem key={faq.id} faq={faq} />
      ))}
    </div>
  )
}

