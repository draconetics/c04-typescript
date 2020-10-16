import axios, { AxiosInstance }  from 'axios'

class NoteService {

    http:AxiosInstance;

    constructor(){
        this.http = axios.create({
            baseURL: 'http://localhost:3000',
            headers: {
                'content-type':'application/json'  // override instance defaults
            },
        });
    }

  async getList() {
        return await this.http.get("/list");
  }

   async createNote(data:Todo){
      return await this.http.post("/new", data);    
    }
}
export default new NoteService();
