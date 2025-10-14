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
import { ArrowLeft, X } from "lucide-react";
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

  const [selectedFilterValue, setSelectedFilterValue] = useState<string>("ultimo_ano");
  const [selectedFilterLabel, setSelectedFilterLabel] = useState<string>("Último ano");

  const [panelSelection, setPanelSelection] = useState<string>(selectedFilterValue);
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

  // Agora, ao selecionar uma opção, o título muda imediatamente
  const handleSelectOption = (optValue: string) => {
    const chosen = FILTER_OPTIONS.find((f) => f.value === optValue);
    if (!chosen) return;
    setPanelSelection(chosen.value);
    setSelectedFilterValue(chosen.value);   // atualiza valor selecionado
    setSelectedFilterLabel(chosen.label);   // atualiza label mostrado no título na hora
  };

  const applyPanelSelection = () => {
    // Com a lógica acima, aplicar só fecha o painel — a seleção já foi aplicada instantaneamente.
    setIsPanelOpen(false);
  };

  const cancelPanel = () => {
    // Se quiser que cancelar reverta ao que estava antes de abrir, descomenta a linha abaixo:
    // setSelectedFilterValue(selectedFilterValue); setSelectedFilterLabel(selectedFilterLabel);
    setPanelSelection(selectedFilterValue);
    setIsPanelOpen(false);
  };

  const handleValidar = () => {
    console.log("Gerar PDF - filtro:", selectedFilterLabel);
    // lógica de geração de PDF...
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
              {/* Título com cor fixa do conteúdo */}
              <Heading as="h2" size="3xl" color="white" fontWeight="medium" textAlign="center">
                {selectedFilterLabel}:
              </Heading>

              <Box position="absolute" right={0} top="50%" transform="translateY(-50%)">
                {/* Botão de filtro visível usando FontAwesome — círculo branco com ícone colorido */}
                <Button
                  aria-label="Abrir filtros"
                  onClick={openPanel}
                  bg="white"
                  color="#055371"
                  w="36px"
                  h="36px"
                  minW="36px"
                  borderRadius="full"
                  _hover={{ bg: "whiteAlpha.900" }}
                  boxShadow="sm"
                >
                  {/* usa o ícone exatamente como tu pediu */}
                  <i className="fa-solid fa-filter" style={{ color: "#055371", fontSize: 16 }} />
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

      {/* BACKDROP */}
      <Box
        as="div"
        display={isPanelOpen ? "block" : "none"}
        position="fixed"
        inset={0}
        bg="blackAlpha.600"
        zIndex={999}
        onClick={cancelPanel}
        transition="opacity 200ms ease"
      />

      {/* SIDEBAR PANEL */}
      <Box
        as="aside"
        position="fixed"
        top={0}
        right={0}
        height="100vh"
        width={{ base: "85%", md: "380px" }}
        maxW="100%"
        bg="white"
        zIndex={1000}
        boxShadow="lg"
        transform={isPanelOpen ? "translateX(0)" : "translateX(110%)"}
        transition="transform 240ms ease"
        aria-hidden={!isPanelOpen}
        role="dialog"
        aria-label="Filtros"
      >
        <Flex align="center" justify="space-between" p={4} borderBottom="1px solid" borderColor="gray.100">
          {/* título 'Filtros' com a cor pedida */}
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

        <Box p={4} overflowY="auto" height="calc(100vh - 72px)">
          {/* texto 'Selecionar período' com a cor pedida */}
          <Text mb={4} color="#055371" fontWeight="semibold">Selecione o período:</Text>

          {/* RADIO GROUP SIMPLES (USANDO INPUT NATIVO) */}
          <Box role="radiogroup" aria-label="Período">
            {FILTER_OPTIONS.map((opt) => {
              const checked = panelSelection === opt.value;
              return (
                <Box
                  key={opt.value}
                  as="label"
                  display="block"
                  cursor="pointer"
                  mb={3}
                  onClick={() => handleSelectOption(opt.value)} // muda instantaneamente
                >
                  <input
                    type="radio"
                    name="periodo"
                    value={opt.value}
                    checked={checked}
                    onChange={() => handleSelectOption(opt.value)}
                    style={{ display: "none" }}
                  />
                  <Flex
                    align="center"
                    justify="space-between"
                    p={3}
                    borderRadius="md"
                    border="1px solid"
                    borderColor={checked ? "#055371" : "gray.200"}
                    bg={checked ? "#f5fbfd" : "white"}
                    _hover={{ bg: checked ? "#f0fbff" : "gray.50" }}
                  >
                    <Text color="#055371" fontWeight={checked ? "semibold" : "normal"}>
                      {opt.label}
                    </Text>

                    {checked ? (
                      <Box
                        as="span"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        w="22px"
                        h="22px"
                        borderRadius="50%"
                        bg="#055371"
                        aria-hidden="true"
                      >
                        <X size={14} color="white" />
                      </Box>
                    ) : (
                      <Box
                        as="span"
                        display="inline-block"
                        w="22px"
                        h="22px"
                        borderRadius="50%"
                        border="2px solid"
                        borderColor="gray.300"
                        aria-hidden="true"
                      />
                    )}
                  </Flex>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Flex p={4} borderTop="1px solid" borderColor="gray.100" gap={3}>
          <Button variant="outline" onClick={cancelPanel} flex="1">
            Cancelar
          </Button>
          <Button colorScheme="teal" onClick={applyPanelSelection} flex="1">
            Fechar
          </Button>
        </Flex>
      </Box>
    </>
  );
}
