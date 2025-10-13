"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react"
import { Sidebar } from "@/components/sidebar"
import { Search, User } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files)
      console.log("Arquivos selecionados:", e.target.files)
    }
  }

  return (
    <Sidebar>
      <Flex direction="column" minH="100vh">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Flex as="main" flex={1} align="center" justify="center" px={4} py={8}>
          <Box w="full" maxW="2xl" bg="white" borderRadius="xl" p={12} boxShadow="lg">
            <VStack gap={6} align="stretch">
              <Text fontSize="2xl" fontWeight="bold" color="#055371" textAlign="center">
                Faça upload da sua reportagem
              </Text>

              <Text fontSize="sm" color="gray.600" textAlign="center" lineHeight="relaxed">
                Verifique os direitos autorais das suas músicas de forma simples e prática! Descubra rapidamente se uma
                faixa possui registro, proteção legal ou restrições de uso. Você pode consultar, comparar e organizar
                suas músicas da maneira que preferir. Tudo rápido, fácil e sem complicação!
              </Text>

              <Flex justify="center" mt={4}>
                <Box position="relative">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileSelect}
                    style={{
                      position: "absolute",
                      opacity: 0,
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                  <label
                    htmlFor="file-upload"
                    style={{
                      display: "inline-block",
                      backgroundColor: "#055371",
                      color: "white",
                      padding: "12px 32px",
                      borderRadius: "8px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#044560"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#055371"
                    }}
                  >
                    Selecionar arquivos
                  </label>
                </Box>
              </Flex>

              {selectedFiles && (
                <Text fontSize="xs" color="gray.500" textAlign="center" mt={2}>
                  {selectedFiles.length} arquivo(s) selecionado(s)
                </Text>
              )}

              <Text fontSize="xs" color="gray.400" textAlign="center" mt={2}>
                ou arraste e solte os arquivos aqui
              </Text>
            </VStack>
          </Box>
        </Flex>

        {/* Footer */}
        <Footer />
      </Flex>
    </Sidebar>
  )
}
