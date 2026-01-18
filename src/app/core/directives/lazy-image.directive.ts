import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appLazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit, OnDestroy {
  @Input() appLazyImage: string = '';
  @Input() fallback: string = '';
  @Input() eager: boolean = false;
  @Input() fetchPriority: 'high' | 'low' | 'auto' = 'low';
  @Input() decoding: 'async' | 'sync' | 'auto' = 'async';
  
  private observer?: IntersectionObserver;
  private imageLoaded = false;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.setOptimizationAttributes();

    if (this.fallback) {
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.fallback);
    }

    if (this.eager) {
      this.loadImage();
      return;
    }

    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      this.loadImage();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '150px',
      threshold: 0.01
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.imageLoaded) {
          this.loadImage();
          this.observer?.disconnect();
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private loadImage(): void {
    if (this.imageLoaded || !this.appLazyImage) {
      return;
    }

    const img = new Image();
    
    img.onload = () => {
      const decodePromise = img.decode ? img.decode() : Promise.resolve();
      decodePromise
        .catch(() => undefined)
        .finally(() => {
          this.renderer.setAttribute(this.el.nativeElement, 'src', this.appLazyImage);
          this.renderer.addClass(this.el.nativeElement, 'loaded');
          this.imageLoaded = true;
        });
    };

    img.onerror = () => {
      if (this.fallback) {
        this.renderer.setAttribute(this.el.nativeElement, 'src', this.fallback);
      }
      this.renderer.addClass(this.el.nativeElement, 'error');
    };

    img.src = this.appLazyImage;
  }

  private setOptimizationAttributes(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'loading', this.eager ? 'eager' : 'lazy');
    this.renderer.setAttribute(this.el.nativeElement, 'decoding', this.decoding);
    this.renderer.setAttribute(this.el.nativeElement, 'fetchpriority', this.fetchPriority);
  }
}
