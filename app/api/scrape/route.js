import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Updated productName logic
    const productName = await page.evaluate(() => {
      const nameElement = document.querySelector('#productTitle');
      return nameElement ? nameElement.innerText.trim() : '';
    });

    const productDescription = await page.evaluate(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        return metaDescription.getAttribute('content').trim();
      }
      
      const descriptionElement = document.querySelector(
        'div[itemprop="description"], #product-description, .product-description'
      );
      return descriptionElement ? descriptionElement.innerText.trim() : '';
    });

    await browser.close();

    if (!productName && !productDescription) {
      return NextResponse.json({ error: 'Unable to extract product information' }, { status: 404 });
    }

    return NextResponse.json({ name: productName, description: productDescription });
  } catch (error) {
    console.error('Error scraping product:', error);
    return NextResponse.json({ error: 'Failed to scrape product' }, { status: 500 });
  }
}
