"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Footer } from "./footer";
import { Flex } from "@chakra-ui/react";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes that should not have Sidebar, Header, and Footer
  const authRoutes = ["/login", "/cadastro", "/"];
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <Sidebar>
      <Flex direction="column" minH="100vh">
        <Header />
        {children}
        <Footer />
      </Flex>
    </Sidebar>
  );
}
