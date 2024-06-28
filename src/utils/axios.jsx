import axios from "axios";

const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGYyMjVjMDUxZmRlMDk3NWZkOWMwNjgzMjllZWZmYSIsInN1YiI6IjY2NWIyZWRhODZjYTcwMDkyYTU5MjMzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tfaXJwlALWQFX030JYI1KJjjPY-JgfwgJTijPDmBBIw'
      },
});
export default instance;