import React, { Suspense } from 'react';
import { fetchProductBySlug } from '@/lib/api/products';
import { PDPView } from '@/components/storefront/PDPView';
import { Metadata } from 'next';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: `${slug} | AZ Mobile Flagship Retail`,
      description: 'Authorized mobile hardware and accessories by AZ Mobile.',
    };
  }

  return {
    title: `${product.title} | AZ Mobile`,
    description: product.description,
  };
}

async function PDPContent({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  // Zero-mock headless fetch: returns null until backend API is connected
  const product = await fetchProductBySlug(slug);
  // Pass data strictly through component props
  return <PDPView product={product} slug={slug} />;
}

export default function ProductDetailPage(props: ProductDetailPageProps) {
  return (
    <Suspense fallback={<PDPView product={null} />}>
      <PDPContent params={props.params} />
    </Suspense>
  );
}
