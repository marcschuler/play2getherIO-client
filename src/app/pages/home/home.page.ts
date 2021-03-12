import {Component} from '@angular/core';
import {GameListItem, WebDto, WebService} from "../../services/web.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {ErrorService} from "../../services/error.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],

    animations: [
        trigger('item', [
            transition(':enter', [
                style({opacity: 0}),
                animate('1500ms', style({opacity: 1})),
            ]),
            transition(':leave', [
                animate('1500ms', style({opacity: 0}))
            ])
        ])
    ]
})
export class HomePage {

    steamId: string;

    groupAwaiting = false;

    exampleItems: GameListItem[] = [{
        game: {
            id: '730',
            name: 'Counter-Strike: Global Offensive'
        },
        players: 3
    }, {
        game: {
            id: '400',
            name: 'Garrys Mod'
        },
        players: 2
    }, {
        game: {
            id: '620',
            name: 'Portal 2'
        },
        players: 1
    }];

    exampleDto: WebDto = {
        id: null,
        games: [
            {
                id: '730',
                name: 'Counter-Strike: Global Offensive'
            }, {
                id: '400',
                name: 'Garrys Mod'
            }, {
                id: '620',
                name: 'Portal 2'
            }
        ],
        version: -1,
        profiles: [
            {
                ownedGameIds: ['730', '400'],
                nickname: 'Ernst',
                id: null,
                profileUrl: null,
                profileImageUrl: 'https://api.kwelo.com/v1/media/identicon/davidtennant.png'
            },
            {
                ownedGameIds: ['730'],
                nickname: 'Klaus',
                id: null,
                profileUrl: null,
                profileImageUrl: 'https://api.kwelo.com/v1/media/identicon/neindochoh.png'
            },
            {
                ownedGameIds: ['730'],
                nickname: 'Günther',
                id: null,
                profileUrl: null,
                profileImageUrl: 'https://api.kwelo.com/v1/media/identicon/nichtdeingünther.png'
            },
            {
                ownedGameIds: ['400', '620'],
                nickname: 'Kevin',
                id: null,
                profileUrl: null,
                profileImageUrl: 'https://api.kwelo.com/v1/media/identicon/lmdaa2lp.png'
            }
        ]
    }

    constructor(private webService: WebService, private router: Router,
                private storage: Storage, private errorService: ErrorService) {
        this.storage.get("steamid").then(s => this.steamId = s)
    }

    createGroup() {
        this.storage.set("steamid", this.steamId);
        this.groupAwaiting = true;
        this.webService.createGroup({
            profile: this.steamId
        }).subscribe(data => {
            console.log(data);
            this.groupAwaiting = false;
            this.router.navigateByUrl("/group/" + data.id)
        }, error => {
            this.errorService.onNetworkError(error, 'Could not create group');
            this.groupAwaiting = false;
        });
    }
}
