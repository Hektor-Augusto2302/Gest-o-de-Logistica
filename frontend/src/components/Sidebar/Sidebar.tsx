"use client";

import Link from "next/link";
import DashboardImage from "../../../public/dashboard.svg";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
    isOpen: boolean;
    isMobile: boolean;
}

export default function Sidebar({ isOpen, isMobile }: SidebarProps) {
    const { user } = useAuth();

    return (
        <>
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40" 
                />
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
                        <Image src={DashboardImage} width={24} height={24} alt="Dashboard" />
                        {isOpen && <span className="text-sm mt-3">Entrada/Saida</span>}
                    </Link>

                    {user?.role === "admin" && (
                        <Link href="/registerAdmin" className="flex text-white flex-col items-center hover:text-gray-400 transition no-underline">
                            <Image src={DashboardImage} width={24} height={24} alt="Registro de Admin" />
                            {isOpen && <span className="text-sm mt-3">Registro de Admin</span>}
                        </Link>
                    )}

                    {user?.role === "admin" && (
                        <Link href="/registerProduct" className="flex text-white flex-col items-center hover:text-gray-400 transition no-underline">
                            <Image src={DashboardImage} width={24} height={24} alt="Registro de Produtos" />
                            {isOpen && <span className="text-sm mt-3">Registro de Produtos</span>}
                        </Link>
                    )}

                    {user?.role === "admin" && (
                        <Link href="/listMovements" className="flex text-white flex-col items-center hover:text-gray-400 transition no-underline">
                            <Image src={DashboardImage} width={24} height={24} alt="Lista de Movimentações" />
                            {isOpen && <span className="text-sm mt-3">Lista de Movimentações</span>}
                        </Link>
                    )}
                </nav>
            </aside>
        </>
    );
}
