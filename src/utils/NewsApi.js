class NewsApi {
    constructor (options) {
        this.url = options.baseUrl;
        this.token = options.token;
    }




getNews(request, to, from) {
    return fetch(this.url+"everything?language=en&q="+request+"&apiKey="+this.token+"&from="+from+"&to="+to+"&pageSize=100", {
        headers:{
            authorization: "Bearer " + this.token,
        }
    })
    .then(res=> {
        if (res.ok) {

            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })
    }
}    

export const newsApi = new NewsApi({
    baseUrl: "https://nomoreparties.co/news/v2/",
    token: "f5a77f977ae84d9fad3d0965995624c2",
 
// baseUrl:"http://localhost:3000"
    }
  );



