'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
//import { Textarea } from '@/components/ui/textarea'

export default function ProductScraper({ onProductScraped }) {
  const [url, setUrl] = useState('')
  const [productName, setProductName] = useState('')
  //const [productDescription, setProductDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleScrape = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
      setProductName(data.name)
      //setProductDescription(data.description)
      onProductScraped(data.name) // Call the function to update the parent's state
    } catch (error) {
      console.error('Error scraping product:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className='text-gray-500 text-md'  htmlFor="url">Product URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com/product"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <Button className='mt-10 w-full' onClick={handleScrape} disabled={loading}>
        {loading ? 'Scraping...' : 'Scrape Product'}
      </Button>
      <div>
        <Label className='text-gray-500 text-md'  htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          readOnly
        />
      </div>
      {/* <div>
        <Label htmlFor="productDescription">Product Description</Label>
        <Textarea
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          readOnly
          rows={5}
        />
      </div> */}
    </div>
  )
}

