import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/lib/data/initialProducts.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Function to determine image based on product id and title
function getImage(id, title, category) {
  if (category === 'Tablets') {
    return '/images/products/apple-ipad-pro-13-back.svg';
  }
  if (category === 'Accessories' || title.toLowerCase().includes('watch')) {
    return '/images/products/apple-watch-ultra-3-back.svg';
  }

  // Samsung
  if (id.includes('prod-sam-s26-ultra') || id.includes('prod-sam-s25-ultra')) {
    return '/images/products/samsung-galaxy-s26-ultra-back.svg';
  }
  if (id.startsWith('prod-sam-')) {
    return '/images/products/samsung-galaxy-a57-back.svg';
  }

  // Apple
  if (id.includes('prod-apple-ip17-pro')) {
    return '/images/products/apple-iphone-17-pro-back.svg';
  }
  if (id.startsWith('prod-apple-ip')) {
    return '/images/products/apple-iphone-17-back.svg';
  }

  // Xiaomi & Poco & Redmi
  if (id.startsWith('prod-poco-')) {
    return '/images/products/poco-x8-pro-back.svg';
  }
  if (id.includes('redmi')) {
    return '/images/products/xiaomi-redmi-note-15-back.svg';
  }
  if (id.startsWith('prod-xiao-')) {
    return '/images/products/xiaomi-17-ultra-back.svg';
  }

  // Honor
  if (id.startsWith('prod-honor-')) {
    return '/images/products/honor-x9d-back.svg';
  }

  return '/images/products/apple-iphone-17-pro-back.svg';
}

// Split by product chunks
const parts = content.split(/(\s*id:\s*'prod-[^']+',)/g);

let newContent = '';
for (let i = 0; i < parts.length; i++) {
  const part = parts[i];
  if (part.includes("id: 'prod-")) {
    const idMatch = part.match(/id:\s*'([^']+)'/);
    const id = idMatch ? idMatch[1] : '';
    newContent += part;
    
    // The next chunk contains title, category, images
    if (i + 1 < parts.length) {
      i++;
      let chunk = parts[i];
      const titleMatch = chunk.match(/title:\s*'([^']+)'/);
      const catMatch = chunk.match(/category:\s*'([^']+)'/);
      const title = titleMatch ? titleMatch[1] : '';
      const cat = catMatch ? catMatch[1] : '';
      const img = getImage(id, title, cat);
      
      chunk = chunk.replace(/images:\s*\[\],/, `images: ['${img}'],`);
      newContent += chunk;
    }
  } else {
    newContent += part;
  }
}

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully updated product images in initialProducts.ts!');
