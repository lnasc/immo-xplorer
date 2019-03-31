import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdService, IAdService } from './services';
import { VisualizerComponent, VisualizerSimpleComponent } from './components';
import { CarouselDirective, CarouselIndicatorDirective, CarouselNextDirective, CarouselPreviousDirective } from './directives';

@NgModule({
  declarations: [
    AppComponent,
    CarouselIndicatorDirective,
    CarouselNextDirective,
    CarouselPreviousDirective,
    CarouselDirective,
    VisualizerComponent,
    VisualizerSimpleComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: IAdService,
    useClass: AdService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
