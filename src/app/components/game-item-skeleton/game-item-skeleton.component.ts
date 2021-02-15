import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-item-skeleton',
  templateUrl: './game-item-skeleton.component.html',
  styleUrls: ['./game-item-skeleton.component.scss'],
})
export class GameItemSkeletonComponent implements OnInit {

  EMPTY_ARRAY_5 = Array(5);

  constructor() { }

  ngOnInit() {}

}
