"use client"

import { Box, Button, Flex } from "@chakra-ui/react"
import Image from "next/image"
import { Search, User } from "lucide-react"

export function Header() {
  return (
    <Box
      as="header"
      w="full"
      bg="#055371"
      borderBottom="2px solid"
      borderColor="whiteAlpha.300"
      px={8}
      py={4}
    >
      <Flex align="center" justify="space-between">
        {/* Espaço à esquerda (pode ser usado futuramente para título ou breadcrumb) */}
        <Box flex={1} />

        {/* Logo centralizado */}
        <Flex flex={1} justify="center">
          <Image
            src="/logo.png"
            alt="GloboBeat Logo"
            width={50}
            height={50}
            style={{ objectFit: "contain" }}
          />
        </Flex>

        {/* Ícones à direita */}
        <Flex flex={1} justify="flex-end" gap={4}>
          <Button
            variant="ghost"
            color="white"
            size="sm"
            _hover={{ bg: "whiteAlpha.200" }}
            aria-label="Buscar"
          >
            <Search size={20} />
          </Button>
          <Button
            variant="ghost"
            color="white"
            size="sm"
            _hover={{ bg: "whiteAlpha.200" }}
            aria-label="Perfil"
          >
            <User size={20} />
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
