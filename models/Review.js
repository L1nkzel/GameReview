export default class Review {
    constructor(id, title, releaseDate, genres, platforms, metacritic, backgroundImage, titleReview, review) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.genres = genres;
        this.platforms = platforms;
        this.metacritic = metacritic;
        this.backgroundImage = backgroundImage;
        this.titleReview = titleReview;
        this.review = review;
    }
}