"use client"

import { Box, Flex, Text } from "@chakra-ui/react"

export function Footer() {
  return (
    <Box
      as="footer"
      w="full"
      bg="#055371"
      py={6}
      borderTop="2px solid"
      borderColor="whiteAlpha.300"
    >
      <Flex justify="center">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="white"
          letterSpacing="wider"
        >
          GLOBOBEAT
        </Text>
      </Flex>
    </Box>
  )
}
