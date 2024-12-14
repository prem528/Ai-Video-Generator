'use client'

import { useState } from 'react'
import ProductScraper from './ProductScraper'
import SelectTopic from './SelectTopic'

export default function ProductContentManager({ onProductScraped, onTopicSelected }) {
  const [scrapedProductName, setScrapedProductName] = useState(null)

  const handleProductScraped = (name) => {
    setScrapedProductName(name)
    onProductScraped(name)
  }

  const handleUserSelect = (type, value) => {
    if (type === 'topic') {
      onTopicSelected(value)
    }
  }

  return (
    <div className="space-y-8">
      <ProductScraper onProductScraped={handleProductScraped} />
      <SelectTopic onUserSelect={handleUserSelect} productName={scrapedProductName} />
    </div>
  )
}

