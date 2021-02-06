import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';

import { GroupPage } from './group.page';
import {ComponentsModule} from "../../components/components.module";
import {TooltipsModule} from "ionic4-tooltips";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GroupPageRoutingModule,
        ComponentsModule,
        TooltipsModule.forRoot()
    ],
  declarations: [GroupPage]
})
export class GroupPageModule {}
