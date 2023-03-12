import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModsRoutingModule } from './mods-routing.module';
import { ModalComponent } from './modal/modal.component';
import { ModsHomeComponent } from './mods-home/mods-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ModalComponent, ModsHomeComponent],
  imports: [CommonModule, ModsRoutingModule, SharedModule],
})
export class ModsModule {}
