import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createPost } from "../apis/eks-be-api";
import { useSnackbar } from 'notistack';



export default function NewPostForm(props) {
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e) {
    e.preventDefault()
    const [ content, signature, token ] = Array.from(e.target)
      .filter(el => el instanceof HTMLInputElement)
      .map(input => input.value);
    try {
      const { data } = await createPost(content, signature, token);
      props.onNewPost(data);
      enqueueSnackbar("New entry successfully created", { variant: "success"});
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error"});
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid 
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <TextField
            required
            id="content"
            name="content"
            label="Write something nice"
            fullWidth
            variant="standard"
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            id="signature"
            name="signature"
            label="Signature"
            fullWidth
            variant="standard"
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="token"
            name="token"
            label="Password"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
    
  );
}
