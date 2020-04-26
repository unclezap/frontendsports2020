const API_ROOT = 'http://localhost:3000'

const token = () => localStorage.getItem("token")

const headers = () => {
    return {
        "Content-Type":"application/json",
        Accept: "application/json",
        // Authorization: token()
    }
}

const createUser = (data) => {
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({user: data})
  }).then(res => res.json());
};

const getArticle = (article_id) => {
    return fetch(`${API_ROOT}/articles/${article_id}`, {headers: headers()})
    .then(response => response.json())
}

const getArticles = () => {
    return fetch(`${API_ROOT}/articles`, {headers: headers()})
    .then(response => response.json())
}

const login = data => {
  return fetch(`${API_ROOT}/auth`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({user: data})
  }).then(res => res.json());
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    headers: headers()
  }).then(res => {
    return res.json();
  });
};

export const api = {
  auth: {
    login,
    getCurrentUser
  },
  user: {
    createUser
  },
  articles: {
    getArticle,
    getArticles
  }
};
