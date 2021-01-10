import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    COLORS = [
        "#f1c40f",
        "#e08a25",
        "#c76548",
        "#ad426c",
        "#733380",
        "#531a5f",
        "#420d46",
        "#2f0733",
        "#28063d",
        "#250d51",
        "#231460",
        "#1c1b6a",
        "#1f2976",
        "#1c3584",
        "#184198",
        "#215ea5",
        "#1c7ab1",
        "#188ebd",
        "#0fb8d4",
        "#0fd1d1" //21 colors ought to be enough for everyone
    ]

    constructor() {
    }
}
