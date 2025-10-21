import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';

export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <Toaster position="top-right" richColors />
        </div>
    );
};
