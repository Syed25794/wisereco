import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import NotesContextProviderWrapper from "./context/NoteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <NotesContextProviderWrapper>
      <App />
    </NotesContextProviderWrapper>
  </ChakraProvider>
);
