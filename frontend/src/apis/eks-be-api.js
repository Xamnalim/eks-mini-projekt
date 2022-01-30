const getEksBackendIp = () => {
  return window._env_.REACT_APP_API_URL
}

const fetchPosts = async () => {
  const ip = getEksBackendIp();
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
      const err = new Error("Podane hasło jest nieaktualne!");
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

const createTokens = async (password, amount) => {
  const ip = getEksBackendIp()
  try {
    const res = await fetch(`${ip}/tokens`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, amount })
      }
    );

    if (res.status === 401) {
      const err = new Error("Podane hasło jest nieprawidłowe!");
      err.token_err = true;
      throw err;
    }

    return await res.json();
  } catch (e) {
    throw new Error(e.token_err ? e.message : "Nie udało się utworzyć tokenów");
  }
}

const fetchTokens = async (password) => {
  return await createTokens(password, 0);
}

export { fetchPosts, createPost, fetchTokens, createTokens };