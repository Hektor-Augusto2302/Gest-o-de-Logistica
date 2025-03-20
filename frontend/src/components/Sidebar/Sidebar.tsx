"use client";

import Link from "next/link";
import DashboardImage from "../../../public/dashboard.svg";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
    isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {

    const { user } = useAuth();

    return (
        <aside
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] p-4 transition-all 
                duration-300 bg-gray-900 text-white
                ${isOpen ? "w-40" : "w-16"}
            `}
        >
            <nav className="mt-8 flex flex-col space-y-4">
                <Link href="/" className="flex text-white flex-col items-center hover:text-gray-400 
                    transition no-underline"
                >
                    <Image 
                        src={DashboardImage} 
                        width={24}
                        height={24}
                        alt="Imagem da dashboard"
                    />
                    {isOpen && <span className="text-sm mt-3">Dashboard</span>}
                </Link>

                <Link href="/stock" className="flex text-white flex-col items-center hover:text-gray-400 
                    transition no-underline"
                >
                    <Image 
                        src={DashboardImage} 
                        width={24}
                        height={24}
                        alt="Imagem da dashboard"
                    />
                    {isOpen && <span className="text-sm mt-3">Estoque</span>}
                </Link>

                {user?.role === "admin" && (
                    <Link href="/registerAdmin" className="flex text-white flex-col items-center hover:text-gray-400 
                        transition no-underline"
                    >
                        <Image 
                            src={DashboardImage} 
                            width={24}
                            height={24}
                            alt="Imagem da dashboard"
                        />
                        {isOpen && <span className="text-sm mt-3">Registro de Admin</span>}
                    </Link>
                )}

                {user?.role === "admin" && (
                    <Link href="/registerProduct" className="flex text-white flex-col items-center hover:text-gray-400 
                        transition no-underline"
                    >
                        <Image 
                            src={DashboardImage} 
                            width={24}
                            height={24}
                            alt="Imagem da dashboard"
                        />
                        {isOpen && <span className="text-sm mt-3">Registro de Produtos</span>}
                    </Link>
                )}
            </nav>
        </aside>
    );
}