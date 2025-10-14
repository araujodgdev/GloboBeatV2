"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface HistoricoItem {
  id: string;
  data: string;
  reportagem: string;
  status: "Validação Confirmada" | "Validação Negada";
}

export default function HistoricoPage() {
  const historico: HistoricoItem[] = [
    {
      id: "1",
      data: "21/09/2025",
      reportagem: "Reportagem9",
      status: "Validação Confirmada",
    },
    {
      id: "2",
      data: "18/09/2025",
      reportagem: "Reportagem6",
      status: "Validação Confirmada",
    },
    {
      id: "3",
      data: "17/09/2025",
      reportagem: "Reportagem5",
      status: "Validação Negada",
    },
    {
      id: "4",
      data: "16/09/2025",
      reportagem: "Reportagem4",
      status: "Validação Confirmada",
    },
    {
      id: "5",
      data: "15/09/2025",
      reportagem: "Reportagem3",
      status: "Validação Confirmada",
    },
    {
      id: "6",
      data: "13/09/2025",
      reportagem: "Reportagem1",
      status: "Validação Negada",
    },
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
            Histórico
          </Heading>
        </Flex>

        <Box
          bg="#055371"
          borderRadius="lg"
          p={6}
          w="full"
          maxW="900px"
          mx="auto"
        >
          <Flex direction="column" gap={4}>
            {historico.map((item) => (
              <Link
                key={item.id}
                href={`/historico/${item.id}`}
                style={{ textDecoration: "none" }}
              >
                <Flex
                  bg="white"
                  p={4}
                  borderRadius="md"
                  justify="space-between"
                  align="center"
                  cursor="pointer"
                  _hover={{ bg: "gray.50" }}
                  transition="background 0.2s"
                >
                  <Text color="#055371" fontWeight="semibold" fontSize="md">
                    {item.data} - {item.reportagem}
                  </Text>
                  <Text
                    color={
                      item.status === "Validação Confirmada"
                        ? "#00C853"
                        : "#FF1744"
                    }
                    fontWeight="bold"
                    fontSize="md"
                  >
                    {item.status}
                  </Text>
                </Flex>
              </Link>
            ))}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
