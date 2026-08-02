'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Subcategory {
  _id: string;
  name: string;
  description: string;
  slug: string;
  service: {
    _id: string;
    name: string;
    slug: string;
  };
}

export default function SubcategoryPage() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch('/api/subcategories');
        const data = await res.json();
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.subcategories)
          ? data.subcategories
          : [];
        setSubcategories(items);
      } catch (error) {
        console.error('Failed to fetch subcategories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading subcategories...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Service Subcategories</h1>

      {subcategories.length === 0 ? (
        <div className="text-center text-gray-500">
          No subcategories found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategories.map((subcategory) => (
            <div key={subcategory._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {subcategory.service.name}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  href={`/services/subcategory/${subcategory.slug}`}
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {subcategory.name}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm mb-4">{subcategory.description}</p>
              <Link
                href={`/services/subcategory/${subcategory.slug}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}