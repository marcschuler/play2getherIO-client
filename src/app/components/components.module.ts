import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameItemComponent} from "./game-item/game-item.component";
import {IonicModule} from "@ionic/angular";
import {FooterComponent} from "./footer/footer.component";



@NgModule({
  declarations: [GameItemComponent, FooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[GameItemComponent, FooterComponent]
})
export class ComponentsModule { }
