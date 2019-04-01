import { AfterContentChecked, Directive, ElementRef, Input, Renderer2, SimpleChanges, OnInit } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[xCarousel]',
})
export class CarouselDirective implements OnInit {
  @Input('xCarousel') options: any;

  private carouselWrapper: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {}

  public ngOnInit(): void {
    this.carouselWrapper = $(this.el.nativeElement);
    this.carouselWrapper.carousel(this.options);
  }
}
