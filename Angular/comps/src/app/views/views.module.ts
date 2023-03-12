import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewsHomeComponentComponent } from './views-home-component/views-home-component.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ViewsHomeComponentComponent, StatisticsComponent],
  imports: [CommonModule, ViewsRoutingModule, SharedModule],
})
export class ViewsModule {}
