import './admin.scss';
import { AuthProvider } from '@/contexts/admin/AuthContext';
import { Toaster } from 'sonner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root dark">
      <AuthProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111111',
              border: '1px solid #2a2a2a',
              color: '#fff',
            },
          }}
        />
      </AuthProvider>
    </div>
  );
}
