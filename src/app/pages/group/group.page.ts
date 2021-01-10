import {Component, OnInit} from '@angular/core';
import {GameListItem, WebDto, WebService} from "../../services/web.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService} from "../../services/error.service";
import {ClipboardService} from "ngx-clipboard";
import {ColorService} from "../../services/color.service";
import {AlertController} from "@ionic/angular";

@Component({
    selector: 'app-group',
    templateUrl: './group.page.html',
    styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

    id: string;
    group: WebDto;

    gameList: GameListItem[] = [];
    url = window.location.href;

    friendInput: string = "";
    friendAwaiting = false;

    showNumber = 25;
    colorStyle: any = {};

    constructor(public webService: WebService, private route: ActivatedRoute,
                private errorService: ErrorService, private clipboardService: ClipboardService,
                private colorService: ColorService, private alertController: AlertController,
                private router: Router) {
    }

    addFriendById(fid:string){
        this.webService.addFriend(this.id, fid).subscribe(data => {
            this.updateData(data);
        }, error => {
            this.errorService.onNetworkError(error);
        });
    }

    addFriend() {
        if (this.friendAwaiting)
            return;
        if (this.friendInput.length < 3)
            this.errorService.onError('Wrong Input', 'The Steam Username or ID must at least have 3 characters');

        this.friendAwaiting = true;
        this.webService.addFriend(this.id, this.friendInput).subscribe(data => {
            this.updateData(data);
            this.friendInput = "";
            this.friendAwaiting = false;
        }, error => {
            this.errorService.onNetworkError(error);
            this.friendAwaiting = false;
        });
    }

    copyLink() {
        this.clipboardService.copy(this.url)
        this.errorService.onError('Copied to Clipboard', '')
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get("gid");

        this.webService.getGroup(this.id).subscribe(data => {
            this.updateData(data);
            this.liveUpdate();
        }, error=>this.onNetworkError(error));
    }

    private liveUpdate() {
        this.webService.getGroupLive(this.id, this.group ? this.group.version : -1).subscribe(data => {
            this.updateData(data);
            this.liveUpdate();
        }, error=>this.onNetworkError(error));
    }

    private onNetworkError(error) {
        if (error.error.status == 404) { //Not found
            this.alertController.create({
                header: 'No group found',
                message: 'The requested group "' + this.id + '" does not exist or was auto-deleted',
                buttons: [
                    {
                        text: 'Retry',
                        handler: ()=>this.liveUpdate()
                    }, {
                        text: 'Back',
                        handler: () => this.router.navigateByUrl('/')
                    }
                ]
            }).then(alert => alert.present());
            return;
        }
        setTimeout(this.liveUpdate, 4000);
        this.errorService.onNetworkError(error);
    }

    private updateData(data: WebDto) {
        if (data == this.group) {
            console.log("No data changes");
            return;
        }
        this.group = data;

        const gameList: GameListItem[] = [];
        this.group.profiles.forEach(profile => {
            profile.ownedGameIds.forEach(gameid => {
                this.addEntry(gameList, gameid);
            })
        });
        gameList.sort((g1, g2) => g2.players - g1.players)

        const colorId = Math.min(gameList[0].players, this.colorService.COLORS.length) - 1;
        this.colorStyle = {'color': this.colorService.COLORS[colorId]};
        this.gameList = gameList;
    }

    private addEntry(list: GameListItem[], gameid) {
        let found = false;
        list.forEach(entry => {
            if (entry.game.id == gameid) {
                entry.players += 1;
                found = true;
            }
        })
        if (!found) {
            list.push({
                players: 1,
                game: this.getGameFromGid(gameid)
            })
        }
    }

    private getGameFromGid(gid) {
        return this.group.games.filter(game => game.id == gid)[0];
    }


    remoteFriend(fid: string) {
        this.webService.removeFriend(this.id, fid).subscribe(() => {
        }, error => this.errorService.onNetworkError(error));
    }
}

