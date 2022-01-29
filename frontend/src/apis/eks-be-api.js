const getEksBackendIp = () => {
  return `http://${process.env.REACT_APP_EKS_BE_IP}:${process.env.REACT_APP_EKS_BE_PORT}`
}

// const fetchPosts = async () => {
//   const ip = getEksBackendIp()
//   const { data: { data } } = await axios.get(`${ip}/posts`);
  
//   return data;
// }

const fetchPosts = async () => {
  const ip = getEksBackendIp()
  const resp = await fetch(`${ip}/posts`);
  const { data } = await resp.json();
  
  return data;
}

const createPost = async (content, signature, token) => {
  const ip = getEksBackendIp()
  try {
    const res = await fetch(`${ip}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, signature, token })
      }
    );

    if (res.status === 401) {
      const err = new Error("Podany token jest nieaktulany!");
      err.token_err = true;
      throw err;
    }
    if (res.status !== 201) {
      throw new Error();
    }

    return await res.json();
  } catch (e) {
    throw new Error(e.token_err ? e.message : "Nie udało się utworzyć wpisu");
  }
}

export { fetchPosts, createPost };