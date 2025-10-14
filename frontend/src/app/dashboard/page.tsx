"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { ArrowLeft, X, Filter } from "lucide-react";
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

  const FILTER_OPTIONS = [
    { value: "ultimo_ano", label: "Último ano" },
    { value: "ultimo_semestre", label: "Último semestre" },
    { value: "ultimo_trimestre", label: "Último trimestre" },
    { value: "ultimo_bimestre", label: "Último bimestre" },
    { value: "ultimo_mes", label: "Último mês" },
  ];

  const [selectedFilterValue, setSelectedFilterValue] = useState("ultimo_ano");
  const [selectedFilterLabel, setSelectedFilterLabel] = useState("Último ano");

  const [panelSelection, setPanelSelection] = useState(selectedFilterValue);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isPanelOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPanelOpen(false);
    };
    if (isPanelOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isPanelOpen]);

  const openPanel = () => {
    setPanelSelection(selectedFilterValue);
    setIsPanelOpen(true);
    setTimeout(() => closeBtnRef.current?.focus(), 100);
  };

  const handleSelectOption = (optValue: string) => {
    const chosen = FILTER_OPTIONS.find((f) => f.value === optValue);
    if (!chosen) return;
    setPanelSelection(chosen.value);
  };

  const applyPanelSelection = () => {
    const chosen = FILTER_OPTIONS.find((f) => f.value === panelSelection);
    if (chosen) {
      setSelectedFilterValue(chosen.value);
      setSelectedFilterLabel(chosen.label);
    }
    setIsPanelOpen(false);
  };

  const cancelPanel = () => {
    setPanelSelection(selectedFilterValue);
    setIsPanelOpen(false);
  };

  const handleValidar = () => {
    console.log("Gerar PDF - filtro:", selectedFilterLabel);
  };

  const validacao_selecionada = !!selectedFilterValue;

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
                <Flex align="center" justify="center" w="32px" h="32px" bg="#055371" borderRadius="full">
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

        <Box bg="#055371" border="2px solid white" borderRadius="lg" p={6} w="full" maxW="1500px" mx="auto">
          <VStack spacing={4} align="stretch">
            <Box position="relative" mb={8}>
              <Heading as="h2" size="3xl" color="white" fontWeight="medium" textAlign="center">
                {selectedFilterLabel}:
              </Heading>
              <Box position="absolute" right={0} top="50%" transform="translateY(-50%)">
                <Button
                  aria-label="Abrir filtros"
                  onClick={openPanel}
                  bg="white"
                  w="56px"
                  h="56px"
                  borderRadius="full"
                  _hover={{ bg: "whiteAlpha.900" }}
                  boxShadow="none"
                  p={0}
                >
                  <Filter color="#055371" size={32} />
                </Button>
              </Box>
            </Box>

            <VStack spacing={5} align="stretch">
              {musicas.map((musica) => (
                <Flex key={musica.nome} justify="space-between" align="center" bg="white" p={4} borderRadius="md" boxShadow="sm">
                  <Text color="#055371" fontWeight="Bold" fontSize="lg">
                    {musica.nome}
                  </Text>
                  <Text color="#055371" fontSize="lg" fontWeight="bold">
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
            px={12}
            py={7}
            fontSize="xl"
            fontWeight="bold"
            _hover={{ bg: "#066d95" }}
            disabled={!validacao_selecionada}
          >
            Gerar PDF
          </Button>
        </Flex>
      </Box>

      <Box
        as="div"
        display={isPanelOpen ? "block" : "none"}
        position="fixed"
        inset={0}
        bg="blackAlpha.600"
        zIndex={1000}
        onClick={cancelPanel}
      />
      <Box
        as="aside"
        position="fixed"
        top={0}
        right={0}
        height="100vh"
        width={{ base: "85%", md: "380px" }}
        maxW="100%"
        bg="white"
        zIndex={1001}
        boxShadow="lg"
        transform={isPanelOpen ? "translateX(0)" : "translateX(110%)"}
        transition="transform 240ms ease"
        display="flex"
        flexDirection="column"
      >
        <Flex align="center" justify="space-between" p={4} borderBottom="1px solid" borderColor="gray.100" flexShrink={0}>
          <Heading size="md" color="#055371">Filtros</Heading>
          <IconButton
            aria-label="Fechar filtros"
            icon={<X size={16} color="#055371" />}
            onClick={cancelPanel}
            ref={closeBtnRef}
            size="sm"
            bg="transparent"
          />
        </Flex>
        
        <Box p={4} overflowY="auto" flex="1">
          <Text mb={4} color="#055371" fontWeight="semibold">Selecione o período:</Text>
          <VStack as="div" role="radiogroup" aria-label="Período" align="stretch" spacing={3}>
            {FILTER_OPTIONS.map((opt) => {
              const checked = panelSelection === opt.value;
              return (
                <Box
                  key={opt.value}
                  as="label"
                  cursor="pointer"
                  onClick={() => handleSelectOption(opt.value)}
                >
                  <input
                    type="radio"
                    name="periodo"
                    value={opt.value}
                    checked={checked}
                    onChange={() => handleSelectOption(opt.value)}
                    style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                  />
                  <Flex
                    align="center"
                    justify="space-between"
                    p={3}
                    borderRadius="md"
                    border="1px solid"
                    borderColor={checked ? "#055371" : "gray.200"}
                    bg={checked ? "blue.50" : "white"}
                    _hover={{ bg: checked ? "blue.100" : "gray.50" }}
                  >
                    <Text color="#055371" fontWeight={checked ? "semibold" : "normal"}>
                      {opt.label}
                    </Text>
                    {checked ? (
                      <Flex as="span" align="center" justify="center" w="22px" h="22px" borderRadius="full" bg="#055371" aria-hidden="true">
                        <Box w="8px" h="8px" borderRadius="full" bg="white" />
                      </Flex>
                    ) : (
                      <Box as="span" w="22px" h="22px" borderRadius="full" border="2px solid" borderColor="gray.300" aria-hidden="true" />
                    )}
                  </Flex>
                </Box>
              );
            })}
          </VStack>
        </Box>

        <Flex p={4} borderTop="1px solid" borderColor="gray.100" gap={3} flexShrink={0}>
          <Button variant="outline" onClick={cancelPanel} flex="1">
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={applyPanelSelection} flex="1" bg="#055371" _hover={{ bg: '#04435a' }}>
            Aplicar
          </Button>
        </Flex>
      </Box>
    </>
  );
}