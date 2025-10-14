"use client";

import { useState } from 'react';
import { Box, Flex, Heading, Text, VStack, Button } from "@chakra-ui/react"; 
import { ArrowLeft, Filter } from "lucide-react"; 
import Link from "next/link";

export default function Dashboard() {
  const musicas = [
    { nome: "Meu bem querer", plays: 6 },
    { nome: "Pétala", plays: 4 },
    { nome: "Samurai", plays: 4 },
    { nome: "Sina", plays: 3 },
    { nome: "Eu te devoro", plays: 2 },
    { nome: "Oceano", plays: 1 },
  ];

  const [validacao_selecionada, setValidacaoSelecionada] = useState(true);

  const handleValidar = () => {
    console.log("Botão 'Gerar PDF' clicado!");
  };

  return (
    <>
      <Box as="main" flex={1} bg="white" p={8} px={32}>
        {/* ... (código do cabeçalho e da lista, sem alterações) ... */}
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
          <Heading as="h1" fontSize="40px" color="#055371" fontWeight="bold">
            Dashboard
          </Heading>
        </Flex>
        
        <Box
          bg="#055371"
          border="2px solid white"
          borderRadius="lg"
          p={6}
          w="full"
          maxW="1500px"
          mx="auto"
        >
          <VStack spacing={4} align="stretch"> 
            <Flex justify="space-between" align="center" mb={8}>
              <Heading as="h2" size="lg" color="white" fontWeight="medium">
                Último ano:
              </Heading>
              <Filter color="white" cursor="pointer" />
            </Flex>

            <VStack spacing={5} align="stretch">
              {musicas.map((musica) => (
                <Flex
                  key={musica.nome}
                  justify="space-between"
                  align="center"
                  bg="white"
                  p={4}
                  borderRadius="md"
                  boxShadow="sm"
                >
                  <Text color="#055371" fontWeight="Bold" fontSize="lg">
                    {musica.nome}
                  </Text>
                  
                  <Text 
                    color="#055371" 
                    fontSize="lg" 
                    fontWeight="bold" 
                  >
                    {musica.plays}
                  </Text>
                </Flex>
              ))}
            </VStack>
          </VStack>
        </Box>

        <Flex justify="center" mt={8}>
          <Button
            onClick={handleValidar}
            borderRadius="lg"
            bg="#055371"
            color="white"
            // 👇 Valores aumentados aqui 👇
            px={12}          // Padding horizontal (antes era 8)
            py={7}           // Padding vertical (antes era 6)
            fontSize="xl"    // Tamanho da fonte (antes era lg)
            fontWeight="bold"
            _hover={{ bg: "#066d95" }}
            disabled={!validacao_selecionada}
          >
            Gerar PDF
          </Button>
        </Flex>
      </Box>
    </>
  );
}