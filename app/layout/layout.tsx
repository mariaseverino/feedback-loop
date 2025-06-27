import { Outlet } from 'react-router';
import Sidebar from '~/components/sidebar';
import { useState } from 'react';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Sidebar />
            <main className="pl-62 pr-4 h-screen bg-[#f5f4ff]">
                <Outlet />
            </main>
        </>
    );
}
