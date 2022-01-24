import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";



export default function NewPostForm() {
  return (
    <Grid 
      container
      spacing={2}
    >
      <Grid item xs={12}>
        <TextField
          required
          id="content"
          name="content"
          label="Napisz coś miłego"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          required
          id="signature"
          name="signature"
          label="Podpis"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="token"
          name="token"
          label="Token"
          fullWidth
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained">
          Dodaj wpis
        </Button>
      </Grid>
    </Grid>
  );
}
