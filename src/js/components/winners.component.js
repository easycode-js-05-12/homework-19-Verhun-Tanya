import { ActiveRoute } from './../core/active.route.service'; 
import { WinnersService } from './../services/winners.service';
import { AuthService } from './../services/auth.service';
import { ENV } from './../config/env';

export class WinnersComponent {
    constructor() {
        this._autService = new AuthService(); 
        this._activeRoute = new ActiveRoute();
        this._winnersService = new WinnersService();
        this._winners;
        this._winnersTemplate;
    }
    async beforeRender() {
            this._winners = await this._winnersService.getWinners();
            this._winnersTemplate = this._winners.winners.map((obj) => 
            this._singleWinnersTemplate(obj));
    }

    render() {
        return `
        <!-- Component styles -->
        <style>
            ${this.style()}
        </style>
        <!-- Component html -->
        <div class="winners-cover-container"
            style="background: url(${ENV.assetsUrl}/img/backgrounds/winners-bg.png) no-repeat center / cover;"
        >
        <h1>Discover inspiring</h1>
        </div>
        <div class="images-container container">
            <div class="row">
               ${this._winnersTemplate.join('')}
            </div>
        </div>
        `}

        style() {
            return `
            .winners-cover-container {
                height: 400px;
                width: 100%;
            }

            .winners-cover-container h1 {
                font-size: 48px;
                padding-top: 150px;
                font-family: robotomedium,sans-serif;
                color: white;
                text-align: center;
            }

            .images-container {
                margin-top: 100px;
            }

            .img-item {
                height: 200px;
                text-align: center;
                overflow: hidden;
                background-color: black;
                margin: 2px;
                position: relative;
                
            }
            .img-item img {
                height: 100%;
                width: auto;
                max-width: none;
            }

            .img-item-hover {
                opacity: 0;
                position: absolute;
                bottom: 0;
                left: 0;
                margin-left: 25px;
                margin-right: 25px;
                margin-bottom: 10px;
                color: white;
                background: rgba(0, 0, 0, .5);
                transition: all .2s ease-in;
            }

                 
            .btn-item-hover {
                opacity: 0;
                position: absolute;
                top: 0;
                right: 0;
                margin-left: 25px;
                margin-right: 25px;
                margin-bottom: 10px;
                color: white;
                background-color: white;
                background: rgba(0, 0, 0, .5);
                transition: all .2s ease-in;
            }

            .btn-like {
                border: none;
                background: transparent;
            }

            

            .fa-thumbs-up {
                margin-left: 25px;
                
            }

            .img-item:hover .img-item-hover {
                opacity: 1;
            }

            .img-item:hover .btn-item-hover {
                opacity: 1;
            }

            
            `
        }

        _singleWinnersTemplate(obj) {
            return `
            <div class="photos-grid d-flex flex-wrap">
                <div class="img-item">
                    <img src="${obj.member_id.images[0].image_basic.url}"> 
                    <div class="img-item-hover">
                        <span>
                            <i class="far fa-eye"></i>
                            ${obj.member_id.images[0].image_basic.views.length}
                        </span>
                        <span>
                            <i class="fas fa-thumbs-up"></i>
                            ${obj.member_id.images[0].image_basic.likes.length}
                        </span>
                    </div>
                    <div class="btn-item-hover">
                        <span>
                            <button class="btn-like">
                                <i class="far fa-heart"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            `
        }

    afterRender() {
        
    }
}