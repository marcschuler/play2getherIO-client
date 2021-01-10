import {Component} from '@angular/core';
import {WebService} from "../../services/web.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {ErrorService} from "../../services/error.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    steamId: string;

    groupAwaiting = false;

    constructor(private webService: WebService, private router: Router,
                private storage: Storage, private errorService:ErrorService) {
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
        },error=>{
            this.errorService.onNetworkError(error,'Could not create group');
            this.groupAwaiting = false;
        });
    }
}
