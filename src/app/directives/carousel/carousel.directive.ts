import { AfterContentChecked, Directive, ElementRef, Input,
  Renderer2,  SimpleChanges, ContentChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

declare var $: any;

@Directive({selector: '[immoCarouselNext]'})
export class CarouselNextDirective implements OnInit {
  private clickSubject = new Subject();
  public click$ = this.clickSubject.asObservable();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {
  }

  public ngOnInit(): void {
    this.renderer.listen(this.el.nativeElement, 'click', e => {
      this.clickSubject.next();
    });
  }
}

@Directive({selector: '[immoCarouselPrevious]'})
export class CarouselPreviousDirective implements OnInit {
  private clickSubject = new Subject();
  public click$ = this.clickSubject.asObservable();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {
  }

  public ngOnInit(): void {
    this.renderer.listen(this.el.nativeElement, 'click', e => {
      this.clickSubject.next();
    });
  }
}

@Directive({selector: '[immoCarouselIndicator]'})
export class CarouselIndicatorDirective implements OnInit {
  private clickSubject = new Subject();
  public click$ = this.clickSubject.asObservable();
  @Input('immoCarouselIndicator') index: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {
  }

  public ngOnInit(): void {
    this.renderer.listen(this.el.nativeElement, 'click', e => {
      this.clickSubject.next(this.index);
    });
  }
}

@Directive({
  selector: '[immoCarousel]',
})
export class CarouselDirective implements AfterContentChecked, OnDestroy {
  @Input('immoCarousel') options: any;
  @Input('immoCarouselInit') init: any;
  @ContentChild(CarouselNextDirective) nextElem: CarouselNextDirective;
  @ContentChild(CarouselPreviousDirective) previousElem: CarouselPreviousDirective;
  @ContentChild(CarouselIndicatorDirective) indicatorElem: CarouselIndicatorDirective;

  private nextSub: Subscription;
  private prevSub: Subscription;
  private indicatorSub: Subscription;
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

      if (this.nextElem) {
        this.nextSub = this.nextElem.click$.subscribe(x =>
          this.carouselWrapper.carousel('next'));
      }
      if (this.previousElem) {
        this.prevSub = this.previousElem.click$.subscribe(x =>
          this.carouselWrapper.carousel('prev'));
      }
      if (this.indicatorElem) {
        this.indicatorSub = this.indicatorElem.click$.subscribe(i =>
          this.carouselWrapper.carousel(i));
      }
    }
  }

  public ngOnDestroy(): void {
    this.nextSub.unsubscribe();
    this.prevSub.unsubscribe();
    this.indicatorSub.unsubscribe();
  }
}
