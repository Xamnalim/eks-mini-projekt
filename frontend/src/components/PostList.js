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
      {posts.map((post) => (
        <Grid item xs={12}>
          <Post
            key={post.id}
            content={post.content}
            signature={post.signature}
          />
          <Divider />
        </Grid>
      ))}
    </Grid>

  );
}
