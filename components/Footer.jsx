import { Box, Text } from "@chakra-ui/react";
import React from "react";

import links from "../data/footerLinks";
import LinkIconBar from "./LinkIconBar";

export default function Footer() {
  return (
    <Box as="footer" mt={12} height="100%" textAlign="center" className="app">
      <Text fontSize="sm">
        Made with{" "}
        <span aria-label="heart" role="img">
          &#128153;
        </span>
        {" by Ritvik Bhardwaj, Nina Ricci, Ayush, and Jarrod"}
      </Text>
      <LinkIconBar links={links} />
    </Box>
  );
}