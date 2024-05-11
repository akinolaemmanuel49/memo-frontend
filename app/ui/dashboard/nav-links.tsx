'use client';

import { Home, Explore, Profile, Settings } from "@/app/ui/icons"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
    {
        name: 'Home',
        href: '/home',
        icon: Home,
    },
    {
        name: 'Explore',
        href: '/explore',
        icon: Explore,
    },
    {
        name: 'Profile',
        href: '/profile',
        icon: Profile,
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: Settings,
    }
]

export default function NavLinks() {
    const pathname = usePathname()
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                "bg-gray-200 text-black": pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}