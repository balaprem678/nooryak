'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Subcategory {
  _id: string;
  name: string;
  description: string;
  content: string;
  slug: string;
  service: {
    _id: string;
    name: string;
    slug: string;
    description: string;
  };
}

interface SubcategoryPageProps {
  params: {
    slug: string;
  };
}

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const res = await fetch(`/api/subcategories/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          setSubcategory(data.subcategory);
        } else {
          console.error('Subcategory not found');
        }
      } catch (error) {
        console.error('Failed to fetch subcategory:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchSubcategory();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading subcategory...</div>
      </div>
    );
  }

  if (!subcategory) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Subcategory Not Found</h1>
          <p className="text-gray-600 mb-4">The subcategory you're looking for doesn't exist.</p>
          <Link
            href="/services/subcategory"
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Subcategories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/services/subcategory"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to Subcategories
        </Link>
      </div>

      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          <Link
            href={`/services/${subcategory.service.slug}`}
            className="hover:underline"
          >
            {subcategory.service.name}
          </Link>
        </span>
      </div>

      <h1 className="text-4xl font-bold mb-4">{subcategory.name}</h1>
      <p className="text-xl text-gray-600 mb-8">{subcategory.description}</p>

      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: subcategory.content }} />
      </div>
    </div>
  );
}