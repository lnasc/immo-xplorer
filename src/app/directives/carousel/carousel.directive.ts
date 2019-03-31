import { AfterContentChecked, Directive, ElementRef, Input,
  OnChanges, Renderer2,  SimpleChanges, ViewChild, ViewChildren, QueryList } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[immoCarousel]',
  queries: {
    goToPreviousElem: new ViewChildren('.carousel-control-prev'),
    goToNextElem: new ViewChildren('.carousel-control-next')
  }
})
export class CarouselDirective implements AfterContentChecked, OnChanges {
  @Input('immoCarousel') options: any;
  @Input('immoCarouselInit') init: any;

  private goToPreviousElem: QueryList<ElementRef>;
  private goToNextElem: QueryList<ElementRef>;

  private initNeeded: boolean;
  private carouselWrapper: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['init']) {
      this.initNeeded = true;
    }
  }

  public ngAfterContentChecked(): void {
    if (this.initNeeded) {
      this.carouselWrapper = $(this.el.nativeElement);
      this.carouselWrapper.carousel(this.options);
      this.initNeeded = false;

      if (this.goToNextElem) {
        this.renderer.listen(this.goToNextElem, 'click', e => {
          this.carouselWrapper.carousel('next');
        });
      }
      if (this.goToPreviousElem) {
        this.renderer.listen(this.goToPreviousElem, 'click', e => {
          this.carouselWrapper.carousel('prev');
        });
      }
    }
  }
}
