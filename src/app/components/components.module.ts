import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameItemComponent} from "./game-item/game-item.component";
import {IonicModule} from "@ionic/angular";
import {FooterComponent} from "./footer/footer.component";
import {TooltipsModule} from "ionic4-tooltips";
import {GameItemSkeletonComponent} from "./game-item-skeleton/game-item-skeleton.component";


@NgModule({
    declarations: [GameItemComponent, FooterComponent,GameItemSkeletonComponent],
    imports: [
        CommonModule,
        IonicModule,
        TooltipsModule.forRoot()
    ],
    exports: [GameItemComponent, FooterComponent,GameItemSkeletonComponent]
})
export class ComponentsModule {
}
