"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Database, MessagesSquare, User, Info } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navigation = [
    {
      name: "Database",
      href: "/",
      icon: Database
    },
    {
      name: "About",
      href: "/about",
      icon: Info
    },
    {
      name: "Chat History",
      href: "/chat-history",
      icon: MessagesSquare
    }
  ];

  return (
    <nav className="border-b">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="text-xl font-semibold">
            <Link href="/">Fintech Advisor</Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 md:gap-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors
                    ${isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:block">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;