import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import Post from "./Post";


export default function PostList(props) {
  const { title, posts } = props;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography mt={3} variant="h4">{title}</Typography>
      </Grid>
      {!posts.length && (
        <Grid item xs={12}>
          <Typography variant="h6">Nikt jeszcze nie dodał wpisu. Możesz być pierwszy/a!</Typography>
        </Grid>
      )}
      {posts.map((post, idx) => (
        <Grid item xs={12} key={post.id}>
          <Post
            content={post.content}
            signature={post.signature}
          />
          <Divider />
        </Grid>
      ))}
    </Grid>

  );
}
