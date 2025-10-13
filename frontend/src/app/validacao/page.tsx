"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import CardTrilha from "@/components/CardTrilha"
import Image from "next/image"
import { Button, Box, Flex, Text } from "@chakra-ui/react"
import { Footer } from "@/components/footer"

export default function TrilhaIdentificada() {
  const trilhas = [
    {
      nome: "Oceano",
      album: "Oceano",
      banda: "Djavan",
      timeStamp: "00:23 - 1:00",
      politica: "(Não encontrada/Restrita/Livre)",
      gMusicID: "XXXXXXXXXX",
    },
    {
      nome: "Oceano",
      album: "Oceano",
      banda: "Djavan",
      timeStamp: "00:23 - 1:00",
      politica: "(Não encontrada/Restrita/Livre)",
      gMusicID: "XXXXXXXXXY",
    },
    {
      nome: "Oceano",
      album: "Oceano",
      banda: "Djavan",
      timeStamp: "00:23 - 1:00",
      politica: "(Não encontrada/Restrita/Livre)",
      gMusicID: "XXXXXXXXXZ",
    },
  ]

  return (
    <Sidebar>
      <Flex direction="column" minH="100vh" bg="white">
        {/* Header principal */}
        <Header />

        {/* Barra superior (detalhes e ações) */}
        <Box position="relative" px={6} py={4} color="#055371">
          {/* Botão Voltar */}
          <Flex position="absolute" top={4} left={6} gap={2} align="center" cursor="pointer" fontSize="2xl">
            <Image src="/voltar.png" alt="Voltar" width={51} height={51} />
            <Text>Voltar</Text>
          </Flex>

          {/* Status + validação + botão PDF */}
          <Flex
            direction="column"
            align="center"
            position="absolute"
            top={20}
            right={6}
            color="#055371"
            textAlign="center"
            gap={10}
          >
            <Text fontSize="2xl" fontWeight="bold">
              Status: <Text as="span" color="yellow.300">Pendente</Text>
            </Text>

            <select
              id="validar"
              name="validar"
              defaultValue=""
              className="!w-100 !p-2 border rounded-lg bg-white text-gray-800 text-sm
                         focus:outline-none ring-2 focus:ring-blue-500 border-blue-400
                         transition duration-200"
            >
              <option value="" disabled>
                Validar
              </option>
              <option value="confirmar">Confirmar</option>
              <option value="negar">Negar</option>
            </select>

            <Button
              borderRadius="lg"
              bg="#055371"
              color="white"
              w={304}
              py="35px"
              fontSize="2xl"
              fontWeight="bold"
              _hover={{ bg: "#066d95" }}
            >
              Gerar PDF
            </Button>
          </Flex>
        </Box>

        {/* Conteúdo principal */}
        <Flex as="main" direction="column" align="center" pt={6} px={4} flex={1}>
          <Text fontSize="4xl" mb={4} fontWeight="bold" color="#055371">
            22/09/2025 - Reportagem 10
          </Text>

          {trilhas.map((trilha) => (
            <CardTrilha
              key={trilha.gMusicID}
              nome={trilha.nome}
              album={trilha.album}
              banda={trilha.banda}
              timestamp={trilha.timeStamp}
              politica={trilha.politica}
              gMusicID={trilha.gMusicID}
            />
          ))}
        </Flex>

        {/* Footer */}
        <Footer />
      </Flex>
    </Sidebar>
  )
}
