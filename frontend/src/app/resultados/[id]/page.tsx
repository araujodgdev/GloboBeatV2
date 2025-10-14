"use client";

import { Box, Flex, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

// This component is defined locally to match the UI, as CardTrilha is not suitable.
function TrackCard(props: {
  nome: string;
  album: string;
  banda: string;
  timestamp: string;
  politica: string;
  gMusicID: string;
}) {
  return (
    <Box bg="#055371" p={5} rounded="md" color="white">
      <VStack align="stretch" spacing={2}>
        <Text>
          <strong>Nome:</strong> {props.nome}
        </Text>
        <Text>
          <strong>Albúm:</strong> {props.album}
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

interface Track {
  nome: string;
  album: string;
  banda: string;
  timestamp: string;
  politica: string;
  gMusicID: string;
}

interface Resultado {
  id: string;
  track: Track;
}

// Mock data based on the image
const mockResultado: Resultado = {
  id: "1",
  track: {
    nome: "Oceano",
    album: "Oceano",
    banda: "Djavan",
    timestamp: "00:23 - 01:00",
    politica: "(Não encontrado/ restrita/ livre)",
    gMusicID: "XXXXXXXXXX",
  },
};

export default function ResultadoDetalhadoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // In a real app, you would fetch the data based on params.id
  const { id } = use(params);
  const resultado = mockResultado;
  const track = resultado.track;

  return (
    <>
      <Box as="main" flex={1} bg="white" p={8}>
        <Flex align="center" justify="space-evenly" mb={8}>
          <Link href="/resultados" passHref>
            <Button
              as="a"
              variant="ghost"
              px={0}
              display="flex"
              alignItems="center"
              gap={3}
              color="#055371"
              fontWeight="semibold"
              _hover={{ bg: "transparent", color: "#033a4f" }}
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
            </Button>
          </Link>
          <Heading as="h1" size="lg" color="black">
            {`${track.nome} - ${track.banda}`}
          </Heading>
          <Box w="80px" /> {/* To balance the flex layout */}
        </Flex>

        <VStack minW="800px" mx="auto">
          <TrackCard
            key={track.gMusicID}
            nome={track.nome}
            album={track.album}
            banda={track.banda}
            timestamp={track.timestamp}
            politica={track.politica}
            gMusicID={track.gMusicID}
          />

        </VStack>
      </Box>
    </>
  );
}
