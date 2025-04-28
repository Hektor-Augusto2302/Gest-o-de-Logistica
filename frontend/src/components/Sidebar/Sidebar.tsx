"use client";

import Link from "next/link";
import DashboardImage from "../../../public/dashboard.svg";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import ArrowDown from "../Navbar/components/ArrowDown/ArrowDown";

interface SidebarProps {
    isOpen: boolean;
    isMobile: boolean;
}

export default function Sidebar({ isOpen, isMobile }: SidebarProps) {
    const { user } = useAuth();
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    return (
        <>
            {isMobile && isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
            )}

            <aside
                className={`fixed top-20 left-0 h-[calc(100vh-4rem)] p-4 transition-all duration-300 bg-gray-900 text-white z-50
                    ${isOpen ? "w-40" : "w-16"}
                    ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
                `}
            >
                <nav className="mt-8 flex flex-col space-y-4">
                    <Link href="/" className="flex text-white flex-col items-center hover:text-gray-400 transition no-underline">
                        <Image src={DashboardImage} width={24} height={24} alt="Dashboard" />
                        {isOpen && <span className="text-sm mt-3">Dashboard</span>}
                    </Link>

                    <Link href="/stock" className="flex text-white flex-col items-center hover:text-gray-400 transition no-underline">
                        <Image src={DashboardImage} width={24} height={24} alt="Estoque" />
                        {isOpen && <span className="text-sm mt-3">Estoque</span>}
                    </Link>

                    <Link href="/movement" className="flex text-white flex-col items-center hover:text-gray-400 transition no-underline">
                        <Image src={DashboardImage} width={24} height={24} alt="Entrada/Saída" />
                        {isOpen && <span className="text-sm mt-3">Entrada/Saída</span>}
                    </Link>

                    {user?.role === "admin" && (
                        <div className="flex flex-col">
                            <button
                                onClick={() => setIsAdminOpen(!isAdminOpen)}
                                className="flex bg-transparent text-white border-none flex-col 
                                items-center hover:text-gray-400 transition no-underline cursor-pointer"
                            >
                                <div className="flex ml-4">    
                                    <Image src={DashboardImage} width={24} height={24} alt="Administração" />
                                    <ArrowDown size={15} color="gray" className="cursor-pointer" />
                                </div>
                                {isOpen && <span className="text-sm mt-3">Paginas Administrativas</span>}
                            </button>

                            {isAdminOpen && (
                                <div className="flex flex-col space-y-2 mt-2 pl-4 border-gray-700 no-underline">
                                    <Link href="/registerAdmin" className="text-white no-underline hover:text-gray-400 transition text-sm">Registro de Admin</Link>
                                    <Link href="/registerProduct" className="text-white no-underline hover:text-gray-400 transition text-sm">Registro de Produtos</Link>
                                    <Link href="/listMovements" className="text-white no-underline hover:text-gray-400 transition text-sm">Lista de Movimentações</Link>
                                    <Link href="/inventory" className="text-white no-underline hover:text-gray-400 transition text-sm">Inventário</Link>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </aside>
        </>
    );
}