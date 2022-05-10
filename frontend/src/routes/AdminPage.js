import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TokenList from "../components/TokenList";
import { useState } from "react";
import AdminForm from "../components/AdminForm";


export default function AdminPage() {
  const [tokens, setTokens] = useState([]);

  const onSubmitHandle = (tokens) => {
    setTokens(tokens);
  }

  return (
    <Container maxWidth="sm">
        <Typography variant="h3">Admin page</Typography>
        <AdminForm onSubmit={onSubmitHandle} />
        <TokenList tokens={tokens} />
    </Container>
  );
}
