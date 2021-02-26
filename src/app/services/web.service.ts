import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRoute} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class WebService {

    BASE_URL = '/api/v1/groups';

    // BASE_URL = "http://localhost:8080/v1/groups"

    constructor(private httpClient: HttpClient) {
        if (new URLSearchParams(window.location.search).has("debug")) {
            this.BASE_URL = 'http://localhost:3101/v1/groups';
            console.log("Started Debug Mode for " + this.BASE_URL)
        } else if (!location.host.includes('play2gether.io')) {
            this.BASE_URL = 'https://play2gether.io' + this.BASE_URL;
            console.log('Activated Dev-Mode for ' + this.BASE_URL);
        }

    }

    public createGroup(groupSetupDto: GroupSetupDto): Observable<WebDto> {
        return this.httpClient.post<WebDto>(this.BASE_URL, groupSetupDto);
    }

    public getGroup(id: string): Observable<WebDto> {
        return this.httpClient.get<WebDto>(this.BASE_URL + '/' + id);
    }

    public getGroupLive(id: string, version: number): Observable<WebDto> {
        return this.httpClient.get<WebDto>(this.BASE_URL + '/' + id + '/live/' + version);
    }

    public addFriend(gid: string, fid: string): Observable<WebDto> {
        return this.httpClient.post<WebDto>(this.BASE_URL + '/' + gid + '/friends/', {
            profile: fid
        });
    }

    public removeFriend(gid: string, fid: string) {
        return this.httpClient.delete<WebDto>(this.BASE_URL + '/' + gid + '/friends/' + fid);
    }

    public getSuggestions(gid: string) {
        return this.httpClient.get<Profile[]>(this.BASE_URL + '/' + gid + '/friends/suggestions');
    }
}

export interface WebDto {
    id: string;
    profiles: Profile[];
    games: Game[];
    version: number;
}

export interface GroupSetupDto {
    profile: string;
}

export interface Profile {
    id: string;
    nickname: string;
    profileImageUrl: string;
    profileUrl: String;
    ownedGameIds: string[];
}

export interface Game {
    id: string;
    name: string;
}

export interface GameListItem {
    players: number
    game: Game
}
