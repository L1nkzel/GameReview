export default class Review {
    constructor(id, title, releaseDate, metaCritic, genres, backgroundImage, review) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.metaCritic = metaCritic;
        this.genres = genres;
        this.backgroundImage = backgroundImage;
        this.review = review;
    }
}