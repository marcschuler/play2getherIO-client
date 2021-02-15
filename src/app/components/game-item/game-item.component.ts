import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {GameListItem, Profile, WebDto} from "../../services/web.service";
import {ColorService} from "../../services/color.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-game-item',
    templateUrl: './game-item.component.html',
    styleUrls: ['./game-item.component.scss'],

    animations: [
        trigger('item',[
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
export class GameItemComponent implements OnInit, OnChanges {

    @Input() data: WebDto;
    @Input() item: GameListItem;

    profiles: Profile[];
    profilesExcluded: Profile[];

    colorStyle: any;

    constructor(private colorService: ColorService) {
    }

    private update() {
        this.profiles = this.data.profiles.filter(profile => profile.ownedGameIds.indexOf(this.item.game.id) != -1);
        this.profilesExcluded = this.data.profiles.filter(p => this.profiles.indexOf(p)==-1);
        const colorId = Math.min(this.item.players, this.colorService.COLORS.length) - 1;
        this.colorStyle = {'background-color':this.colorService.COLORS[colorId] };
    }

    ngOnInit() {
        this.update();
    }

    ngOnChanges() {
        this.update();
    }

}
