"use client";

import { Box, Flex, Heading, ListItem, Text, List } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface Resultado {
  nome: string;
  status: "Livre" | "Restrita";
  id: string;
}

export default function Resultados() {
  const resultados = [
    { id: "1", nome: "Oceano", banda: "Djavan", status: "Livre" },
    { id: "2", nome: "Meu bem querer", banda: "Djavan", status: "Livre" },
    { id: "3", nome: "Pétala", banda: "Djavan", status: "Livre" },
    { id: "4", nome: "Samurai", banda: "Djavan", status: "Livre" },
    { id: "5", nome: "Sina", banda: "Djavan", status: "Livre" },
    { id: "6", nome: "Eu te devoro", banda: "Fagner", status: "Restrita" },
  ];

  return (
    <>
      <Box as="main" flex={1} bg="white" p={8} px={32}>
        <Flex align="center" justify="center" mb={8} position="relative">
          <Box position="absolute" left={0}>
            <Link href="/page_upload">
              <Flex
                align="center"
                gap={3}
                color="#055371"
                fontWeight="semibold"
                cursor="pointer"
                _hover={{ color: "#033a4f" }}
              >
                <Flex
                  align="center"
                  justify="center"
                  w="32px"
                  h="32px"
                  bg="#055371"
                  borderRadius="full"
                >
                  <ArrowLeft size={18} color="white" />
                </Flex>
                Voltar
              </Flex>
            </Link>
          </Box>
          <Heading as="h1" size="xl" color="#055371" fontWeight="bold">
            Resultados
          </Heading>
        </Flex>
        <Box
          bg="#055371"
          border="2px solid white"
          borderRadius="lg"
          p={6}
          w="full"
          maxW="800px"
          mx="auto"
        >
          <List.Root margin={0} spaceY={4}>
            {resultados.map((resultado, index) => (
              <Link
                href={`/resultados/${resultado.id}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  key={index}
                  bg="white"
                  p={3}
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  color="black"
                >
                  <Box>
                    <Text fontWeight="bold">{resultado.nome}</Text>
                    <Text fontSize="sm" color="gray.600">{resultado.banda}</Text>
                  </Box>
                  <Text
                    color={
                      resultado.status === "Livre" ? "green.500" : "red.500"
                    }
                    fontWeight="bold"
                  >
                    {resultado.status}
                  </Text>
                </ListItem>
              </Link>
            ))}
          </List.Root>
        </Box>
      </Box>
    </>
  );
}
