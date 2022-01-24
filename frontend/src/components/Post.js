import Typography from "@mui/material/Typography";

export default function Post(props) {
  const { content, signature } = props;
  
  return (
    <>
      <Typography variant="h6">{signature}</Typography>
      <Typography variant="body1">{content}</Typography>
    </>
  );
}
