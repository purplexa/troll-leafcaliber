import { useState } from "react";
import "./App.css";
import {
  Box,
  ChakraProvider,
  defaultSystem,
  Field,
  Heading,
  Stack,
  Textarea,
} from "@chakra-ui/react";

function Page() {
  const [text, setText] = useState("");
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setText(e.currentTarget.value);
  };
  const convertedText = text.replaceAll(/\s*\S+/g, (match) => `||${match}||`);
  return (
    <Box>
      <Heading>LeafCaliber Spoiler Trolling Tool</Heading>
      <Stack gap="4">
        <Textarea
          placeholder="Message to convert..."
          autoresize
          onChange={onChange}
        />
        <Field.Root
          onClick={() => {
            navigator.clipboard.writeText(convertedText);
          }}
        >
          <Textarea disabled autoresize value={convertedText} />
          <Field.HelperText style={{ cursor: "pointer" }}>
            Click to copy.
          </Field.HelperText>
        </Field.Root>
      </Stack>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Page />
    </ChakraProvider>
  );
}

export default App;
