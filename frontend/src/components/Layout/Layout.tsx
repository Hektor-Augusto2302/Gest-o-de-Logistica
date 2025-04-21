"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const pathname = usePathname();
    const hideLayout = pathname === "/login" || pathname === "/registerUser";

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 524);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    return (
        <div className="h-screen flex flex-col">
            {!hideLayout && <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

            <div className="flex flex-1">
                {!hideLayout && <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} />}

                <main
                    className={`flex-1 ${
                        hideLayout ? "" : `pt-10 px-10 mt-10 ${isMobile ? "pl-24" : isSidebarOpen ? "ml-40" : "ml-16"}`
                    }`}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
