import { ActiveRoute } from './../core/active.route.service'; 
import { NewsService } from './../services/news.service';
import { AuthService } from './../services/auth.service';

export class NewsComponent {
    constructor() {
        this._autService = new AuthService(); 
        this._activeRoute = new ActiveRoute();
        this._newsService = new NewsService();
        this._news;
        this._newsTemplate;
    }
    async beforeRender() {
            this._news = await this._newsService.getNews(this._autService.token);
            this._newsTemplate = this._news.news.map((obj) => 
            this._singleNewsTemplate(obj));
    }

    render() {
        return `
        <style>
            ${this.style()}
        </style>

        <div class="container ng-star-inserted">
            ${this._newsTemplate.join('')}
        </div>
        `}

        style() {
            return `
            .item-info {
                text-align: center;
                overflow: hidden;
                margin-bottom: 30px;
                position: relative;
            }

            .author-img {
                background-color: white;
                text-decoration: none;
                color: inherit;
                
            }

            .author-img img {
                width: 100%;
                
            }

            .img-item {
                text-align: center;
                overflow: hidden;
                margin-bottom: 30px;
                position: relative;
            }
            .img-item img {
                width: 100%; 
                height: 400px;
            }
            `
        }

        _singleNewsTemplate(obj) {
            return `
            <div class="news-item bg-light-secondary d-flex flex-column flex-lg-row ng-star-inserted">
                <div class = "item-info d-flex flex-row flex-lg-column flex-wrap flex-md-nowrap align-items-center flex-shrink-0">
                <div class="author-info-wrapper d-flex flex-row flex-lg-column align-items-center overflow-hidden">
                    <a class = "author-img overflow-hidden" href = "#/users/${obj.owner._id}">
                        <img src="${obj.owner.avatar}">
                    </a>
                    <div class="author-info d-flex flex-column align-items-start align-items-lg-center">
                        <a class="author-name text-center text-overflow-ellipsis" href = "#/users/${obj.owner._id}" style="text-decoration: none; color: black">${obj.owner.full_name}</a>
                        <span class="author-country">${obj.owner.country}</span>
                    </div>
                </div>
                <button class="btn btn-bg-light align-self-center btn-border-gradient ng-star-inserted btn-outline-info">Follow</button>
                </div>
                <div class="col-md-8">
                    <div class="img-item">
                    <img src="${obj.pictures[0].url}">
                    </div>
                </div>
            </div>
            `
        }

    afterRender() {

    }
}