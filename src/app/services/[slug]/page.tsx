'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params ? (params as any).slug : null;
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setService(data.service);
        }
      } catch (err) {
        console.error('Failed to fetch service', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchService();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading...</div>;
  if (!service) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Service Not Found</div>;

  return (
    <>
      <main className="min-h-screen bg-[#0a0a0a] text-white pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="service-details-content">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff7a18] to-[#ff3d00] flex items-center justify-center text-white shadow-xl">
                    <i className={service.icon || 'flaticon-settings'} style={{ fontSize: '24px' }}></i>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold">{service.name}</h1>
                </div>
                
                <p className="text-xl text-[#888] mb-12 italic border-l-4 border-[#ff7a18] pl-6">
                  {service.description}
                </p>

                <div 
                  className="prose prose-invert prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.content }} 
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <style jsx global>{`
        .service-details-content h1, .service-details-content h2, .service-details-content h3 {
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        .service-details-content p {
          color: #ccc;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .service-details-content ul, .service-details-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          color: #ccc;
        }
        .service-details-content li {
          margin-bottom: 0.5rem;
        }
        .service-details-content a {
          color: #ff7a18;
          text-decoration: underline;
        }
        .service-details-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 2rem 0;
        }
      `}</style>
    </>
  );
}
