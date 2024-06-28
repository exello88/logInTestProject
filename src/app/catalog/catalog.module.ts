import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogFieldComponent } from './catalog-field/catalog-field.component';
import { CatalogCardComponent } from './catalog-card/catalog-card.component';
import { CatalogService } from './catalog.service';




@NgModule({
  declarations: [
    CatalogFieldComponent,
    CatalogCardComponent
  ],
  exports: [
    CatalogFieldComponent
  ],
  imports: [
    CommonModule
  ],
  providers : [
    CatalogService
  ]
})
export class CatalogModule { }
