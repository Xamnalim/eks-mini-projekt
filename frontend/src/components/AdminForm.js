import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createTokens } from "../apis/eks-be-api";
import { useSnackbar } from 'notistack';



export default function AdminForm(props) {
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e) {
    e.preventDefault()
    const [amount, password] = Array.from(e.target)
      .filter(el => el instanceof HTMLInputElement)
      .map(input => input.value);
    try {
      const { data } = await createTokens(password, amount);
      console.log(data);
      props.onSubmit(data);
      enqueueSnackbar(`Operacja przebiegła pomyślnie!`, { variant: "success" });
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={6}>
          <TextField
            required
            id="amount"
            name="amount"
            label="Ilość tokenów"
            fullWidth
            variant="standard"
            defaultValue={0}
            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="password"
            name="password"
            label="Hasło"
            fullWidth
            variant="standard"
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Generuj tokeny
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
