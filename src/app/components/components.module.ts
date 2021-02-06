import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameItemComponent} from "./game-item/game-item.component";
import {IonicModule} from "@ionic/angular";
import {FooterComponent} from "./footer/footer.component";
import {TooltipsModule} from "ionic4-tooltips";


@NgModule({
    declarations: [GameItemComponent, FooterComponent],
    imports: [
        CommonModule,
        IonicModule,
        TooltipsModule.forRoot()
    ],
    exports: [GameItemComponent, FooterComponent]
})
export class ComponentsModule {
}
