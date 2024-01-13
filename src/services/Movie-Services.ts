export default class MovieService {
    async getResource(url:string) {
        const res = await fetch(url, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDY4ZjMwMjlhOGVkZWNlZmNhOGQ5MWZhNzhiMWQ3MyIsInN1YiI6IjY1YTEzZmQ5Y2NkZTA0MDEyYjhiOGVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lZtgyiXy4FKk02PgoFpXvRze6nT6iNsJdIFZATz6YUg"
            }
            });
        return await res.json();
}
}