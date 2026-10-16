import { NextResponse } from 'next/server';
import { dbCreateProduct, dbGetProducts } from '@/lib/db/neon';
import { INITIAL_PRODUCTS } from '@/lib/data/initialProducts';

export async function POST() {
  try {
    const existing = await dbGetProducts();
    if (existing.total >= INITIAL_PRODUCTS.length) {
      return NextResponse.json({
        message: 'Bazada allaqachon barcha mahsulotlar mavjud.',
        count: existing.total,
      });
    }

    let addedCount = 0;
    for (const item of INITIAL_PRODUCTS) {
      const alreadyExists = existing.products.some((p) => p.slug === item.slug);
      if (!alreadyExists) {
        await dbCreateProduct({
          title: item.title,
          description: item.description,
          brand: item.brand,
          category: item.category,
          basePrice: item.basePrice,
          status: item.status,
          variants: item.variants.map((v) => ({
            color: v.color,
            colorHex: v.colorHex,
            storage: v.storage,
            ram: v.ram || 'N/A',
            price: v.price,
            sku: v.sku,
            stock: v.stock,
          })),
        });
        addedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `${addedCount} ta yangi mahsulot muvaffaqiyatli yuklandi!`,
      count: addedCount,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Xatolik yuz berdi';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
