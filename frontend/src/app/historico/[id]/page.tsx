"use client";

import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface Track {
  nome: string;
  album: string;
  banda: string;
  timestamp: string;
  politica: string;
  gMusicID: string;
}

interface ReportagemDetalhes {
  id: string;
  data: string;
  reportagem: string;
  status: "Validação Confirmada" | "Validação Negada";
  tracks: Track[];
}

// Mock data - In production, fetch based on params.id
const mockReportagens: Record<string, ReportagemDetalhes> = {
  "1": {
    id: "1",
    data: "22/09/2025",
    reportagem: "Reportagem9",
    status: "Validação Confirmada",
    tracks: [
      {
        nome: "Oceano",
        album: "Oceano",
        banda: "Djavan",
        timestamp: "00:23 - 01:00",
        politica: "(Não encontrado/ restrita/ livre)",
        gMusicID: "XXXXXXXXXXX",
      },
    ],
  },
  "2": {
    id: "2",
    data: "18/09/2025",
    reportagem: "Reportagem6",
    status: "Validação Confirmada",
    tracks: [
      {
        nome: "Sample Track",
        album: "Sample Album",
        banda: "Sample Artist",
        timestamp: "00:00 - 00:30",
        politica: "(Não encontrado/ restrita/ livre)",
        gMusicID: "XXXXXXXXXXX",
      },
    ],
  },
  "3": {
    id: "3",
    data: "17/09/2025",
    reportagem: "Reportagem5",
    status: "Validação Negada",
    tracks: [
      {
        nome: "Sample Track",
        album: "Sample Album",
        banda: "Sample Artist",
        timestamp: "00:00 - 00:30",
        politica: "(Não encontrado/ restrita/ livre)",
        gMusicID: "XXXXXXXXXXX",
      },
    ],
  },
};

function TrackCard(props: Track) {
  return (
    <Box bg="#055371" p={5} rounded="md" color="white" w="full">
      <VStack align="stretch" gap={2}>
        <Text>
          <strong>Nome:</strong> {props.nome}
        </Text>
        <Text>
          <strong>Álbum:</strong> {props.album}
        </Text>
        <Text>
          <strong>Banda:</strong> {props.banda}
        </Text>
        <Text>
          <strong>Timestamp:</strong> {props.timestamp}
        </Text>
        <Text>
          <strong>Política:</strong> {props.politica}
        </Text>
        <Text>
          <strong>G music ID:</strong> {props.gMusicID}
        </Text>
      </VStack>
    </Box>
  );
}

export default function ReportagemDetalhesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // In a real app, you would fetch the data based on params.id
  const { id } = use(params);
  const reportagem = mockReportagens[id] || mockReportagens["1"];

  const getStatusColor = () => {
    return reportagem.status === "Validação Confirmada" ? "#00C853" : "#FF1744";
  };

  return (
    <>
      <Box as="main" flex={1} bg="white" p={8} px={32}>
        <Flex align="center" justify="space-between" mb={8}>
          <Link href="/historico">
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

          <Heading as="h1" size="lg" color="#055371" fontWeight="bold">
            {reportagem.data} - {reportagem.reportagem}
          </Heading>

          <Flex direction="column" gap={4} align="center">
            <Text fontSize="lg" fontWeight="bold" color="#055371">
              Status: <Text as="span" color={getStatusColor()}>{reportagem.status}</Text>
            </Text>

            <Button
              borderRadius="lg"
              bg="#055371"
              color="white"
              px={8}
              py={6}
              fontSize="lg"
              fontWeight="bold"
              _hover={{ bg: "#066d95" }}
            >
              Gerar PDF
            </Button>
          </Flex>
        </Flex>

        <VStack gap={4} maxW="700px" mx="auto">
          {reportagem.tracks.map((track, index) => (
            <TrackCard key={index} {...track} />
          ))}
        </VStack>
      </Box>
    </>
  );
}
