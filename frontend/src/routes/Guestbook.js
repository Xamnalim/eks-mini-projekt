import Container from "@mui/material/Container";
import NewPostForm from "../components/NewPostForm";
import Typography from "@mui/material/Typography";
import PostList from "../components/PostList";
import { useState, useEffect } from "react";
import { fetchPosts } from "../apis/eks-be-api";
import { useSnackbar } from 'notistack';


function GuestBook() {

  const [posts, setPosts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        data.sort((a, b) => (b.id - a.id));
        setPosts(data);
      })
      .catch(() => enqueueSnackbar("Unable to fetch API", { variant: "error"}));
  }, []);

  function addNewPost(post) {
    setPosts([post, ...posts]);
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Wedding guest book</Typography>
        <NewPostForm onNewPost={addNewPost} />
        <PostList title="Our guests:" posts={posts}/>
    </Container>
  );
}

export default GuestBook;
