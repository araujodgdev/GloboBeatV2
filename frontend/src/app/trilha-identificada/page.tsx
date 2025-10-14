"use client"

import CardTrilha from "@/components/CardTrilha"
import Image from "next/image"
import { Button, Box, Flex, Text } from "@chakra-ui/react"

export default function TrilhasIdentificadas() {
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
    <>
      <Flex direction="column" flex={1} bg="white">
        {/* Barra superior */}
        <Box position="relative" px={6} py={4} color="#055371">
          {/* Botão Voltar */}
          <Flex position="absolute" top={4} left={6} gap={2} align="center" cursor="pointer" fontSize="2xl">
            <Image src="/voltar.png" alt="Voltar" width={51} height={51} />
            <Text>Voltar</Text>
          </Flex>

          {/* Texto e botão (lado direito) */}
          <Flex
            direction="column"
            position="absolute"
            top={20}
            right={6}
            textAlign="center"
            maxW="md"
            color="#055371"
          >
            <Text mb={4}>
              Adicione trilhas musicais não identificadas de forma rápida e prática! <br />
              Organize, complete e mantenha seu arquivo sempre atualizado, sem complicação.
            </Text>

            <Button
              borderRadius="lg"
              bg="#055371"
              color="white"
              px="90px"
              py="45px"
              fontSize="2xl"
              fontWeight="bold"
              _hover={{ bg: "#066d95" }}
            >
              Adicionar Trilha
            </Button>
          </Flex>
        </Box>

        {/* Conteúdo principal */}
        <Flex as="main" direction="column" align="center" pt={6} px={4} flex={1}>
          <Text fontSize="4xl" mb={4} fontWeight="bold" color="#055371">
            Trilha(s) identificadas
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

      </Flex>
    </>
  )
}
