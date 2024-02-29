import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    const response = await fetch("https://backengine-z3eh.fly.dev/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Assuming the API returns a token on successful login
      // Set the token in local storage or state management
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "You've successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Handle errors, show messages, etc.
      toast({
        title: "Login Failed",
        description: "The email or password may be incorrect.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoggedIn) {
    return (
      <Container>
        <Heading>Welcome to the Interactive API</Heading>
        {/* More UI components to interact with other API features */}
      </Container>
    );
  }

  return (
    <Container>
      <VStack spacing={4}>
        <Heading>Login</Heading>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
          Sign In
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
