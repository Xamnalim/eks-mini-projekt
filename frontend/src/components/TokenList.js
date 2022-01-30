import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export default function TokenList(props) {
  const { tokens } = props;

  return (
    <Grid container spacing={5}
      direction="column"
      justifyContent="center"
      alignItems="center">
      <Grid item xs={12}>
        <Typography mt={3} variant="h4">Dostępne tokeny:</Typography>
      </Grid>
      {!tokens.length && (
        <Grid item xs={12}>
          <Typography variant="h6">Brak tokenów</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        {tokens.map((token) => (
          <Typography key={token.id} variant="body1">{token.token}</Typography>
        ))}
      </Grid>

    </Grid>

  );
}
