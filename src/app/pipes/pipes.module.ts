import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSchemePipe } from './color-scheme.pipe';



@NgModule({
  declarations: [ColorSchemePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
