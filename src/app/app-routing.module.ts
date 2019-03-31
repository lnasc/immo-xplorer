import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizerComponent } from './components';
import { VisualizerSimpleComponent } from './components/visualizer-simple/visualizer-simple.component';

const routes: Routes = [{
  path: '',
  component: VisualizerSimpleComponent
}, {
  path: 'visualizer',
  component: VisualizerComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
