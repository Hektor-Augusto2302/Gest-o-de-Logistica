"use client";

import { useState } from "react";
import { Search, Bell, UserCircle } from "lucide-react";
import Menu from "../../../public/Menu.svg";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { uploads } from "@/utils/upload";
import ArrowDown from "./components/ArrowDown/ArrowDown";

interface NavbarProps {
    toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {

    const { logout, user } = useAuth()

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full py-4 md:px-10 z-50 navbar shadow-[0_2px_10px_rgba(0,0,0,0.1)] backdrop-blur-md bg-white/70 dark:bg-gray-900/70">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                <button className="bg-white cursor-pointer border-none" onClick={toggleSidebar}>
                    <Image
                        src={Menu}
                        alt="Botão hamburguer"
                    />
                </button>

                <div className="flex items-center gap-4 mr-[50px]">
                    <Search size={28} className="text-gray-300 cursor-pointer hover:text-black transition" />
                    <Bell size={28} className="text-black-300 cursor-pointer hover:text-gray transition fill-current" />

                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 border-none bg-transparent cursor-pointer"
                        >
                            {user?.profileImage ? (
                                <Image 
                                    src={`${uploads}/users/${user.profileImage}`} 
                                    alt="Foto de perfil" 
                                    width={32} 
                                    height={32} 
                                    className="w-8 h-8 rounded-full object-cover" 
                                />
                            ) : (
                                <UserCircle size={32} className="text-gray-300" />
                            )}
                            <p>{user ? user.name : "Visitante"}</p>
                            <ArrowDown size={15} color="gray" className="cursor-pointer" />
                        </button>


                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2">
                                <Link href="/profile" className="block px-4 py-2 text-white hover:bg-gray-700 no-underline">
                                    Perfil
                                </Link>
                                <button onClick={logout}  className="block w-full text-left border-none hover:bg-gray-700 px-4 py-2 text-red-400 bg-transparent cursor-pointer">
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}