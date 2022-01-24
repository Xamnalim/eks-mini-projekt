import Container from "@mui/material/Container";
import NewPostForm from "../components/NewPostForm";
import Typography from "@mui/material/Typography";
import PostList from "../components/PostList";
import { useState, useEffect } from "react";


const post1 = {
  id: 1,
  content: "Post 1",
  signature: "Jan Kowalski"
}

const post2 = {
  id: 2,
  content: "Post 2",
  signature: "Janusz Tracz"
}

const post3 = {
  id: 3,
  content: "Post 3",
  signature: "Marcin Zygman"
}

const mockedPosts = [post1, post2, post3];

function GuestBook() {

  const [posts, setPosts] = useState(mockedPosts);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Weselna księga gości</Typography>
        <NewPostForm />
        <PostList title="Nasi goście:" posts={posts}/>
    </Container>
  );
}

export default GuestBook;
