import { NextRequest, NextResponse } from 'next/server';
import { dbGetProducts, dbCreateProduct } from '@/lib/db/neon';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const query = searchParams.get('q') || undefined;
    const brands = searchParams.get('brands')?.split(',').filter(Boolean);
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

    const result = await dbGetProducts({
      category,
      query,
      brands,
      maxPrice,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Xatolik yuz berdi';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.basePrice) {
      return NextResponse.json(
        { error: 'Mahsulot nomi va narxi talab qilinadi.' },
        { status: 400 }
      );
    }

    const created = await dbCreateProduct(body);
    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Saqlashda xatolik yuz berdi';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
