class MainApi {
    constructor (options) {
        this.url = options.baseUrl;

    }

    register (email, password, name) {
        return fetch(`${this.url}/signup`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password, name})
        })
        .then((res) => res.json());
  }
    
      
      signIn (email, password) {
        return fetch(`${this.url}/signin`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})
        })
        .then((res) => res.json())
        .then((data) => {
          if (!data.message) {
            localStorage.setItem('token', data.token);
          }
          return data;
        });
    }
  
      
     checkToken (token) {
        return fetch(`${this.url}/users/me`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        .then(res => res.json())
        .then(data => data)
      }
      

getUserInfo(token){
    return fetch(this.url+"/users/me", {
        headers:{
            authorization: "Bearer " + token,
        }
    })
    .then(res=> {
            return res.json()
    })
}

getSavedArticles(token){
    return fetch(this.url+"/articles", {
        method: "GET",
        headers:{
            authorization: "Bearer " + token,
        }
    })
    .then(res=> {
               
                return res.json()
            }
           
        )
}

saveArticle(article, token) {
        return fetch(this.url+"/articles", {
            method: "POST",
            headers:{
                authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                source: article.source,
                link: article.link,
                title: article.title,
                date: article.date,
                text: article.text,
                keyword: article.keyword,
                image: article.image,
            })
        })
        .then(res=> {
                    return res.json()
            })
    
}    

deleteArcticle(id, token)    {
    return fetch(this.url+"/articles/" + id, {
    method: "DELETE",
    headers:{
        authorization: "Bearer " + token,
        "Content-Type": "application/json"
    },
})
.then(res=> {
        if (res.ok) {
           
            return res.json()
    
    }
})

}
}
export const mainApi = new MainApi({
  
 //   token: "f5a77f977ae84d9fad3d0965995624c2",
 
 baseUrl:"https://news-explorer-api-ykwe.onrender.com"
    }
  );



