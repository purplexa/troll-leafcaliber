import React, { useState } from "react";
import "./App.css";
import {
  Box,
  ChakraProvider,
  defaultSystem,
  Field,
  Heading,
  HStack,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";

type TrollType = "word" | "random" | "letter";

const convertText = (text: string, trollType: TrollType) => {
  let ret = "||";
  switch (trollType) {
    case "word":
      return text.replaceAll(/\s*\S+/g, (match) => `||${match}||`);
    case "letter":
      return text.replaceAll(/./g, (match) => `||${match}||`);
    case "random":
      for (const letter of text.substring(0, text.length - 1)) {
        const check = Math.floor(Math.random() * 3);
        if (check === 0) {
          ret = `${ret}${letter}||||`;
        } else {
          ret = `${ret}${letter}`;
        }
      }
      ret = `${ret}${text[text.length - 1]}||`;
  }
  return ret;
};

function Page() {
  const [text, setText] = useState("");
  const [trollText, setTrollText] = useState("");
  const [trollType, setTrollType] = useState<TrollType>("word");
  const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const val = e.currentTarget.value;
    setText(val);
    setTrollText(convertText(val, trollType));
  };
  const onTypeChange = (e: RadioGroup.ValueChangeDetails) => {
    const val: TrollType = (e.value as TrollType) || "word";
    setTrollType(val);
    setTrollText(convertText(text, val));
  };

  return (
    <Box>
      <Heading>LeafCaliber Spoiler Trolling Tool</Heading>
      <Stack gap="4">
        <Textarea
          placeholder="Message to convert..."
          autoresize
          onChange={onTextChange}
        />
        <RadioGroup.Root value={trollType} onValueChange={onTypeChange}>
          <HStack>
            <RadioGroup.Item value="word">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>By Word</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="letter">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>By Letter</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="random">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>Randomly</RadioGroup.ItemText>
            </RadioGroup.Item>
          </HStack>
        </RadioGroup.Root>
        <Field.Root
          onClick={() => {
            navigator.clipboard.writeText(trollText);
          }}
        >
          <Textarea disabled autoresize value={trollText} />
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
