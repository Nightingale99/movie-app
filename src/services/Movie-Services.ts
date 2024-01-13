export default class MovieService {
    private api_key:string = '4468f3029a8edecefca8d91fa78b1d73';

    async getResource(url:string) {
        const res = await fetch(url);
        return await res.json();
}
}