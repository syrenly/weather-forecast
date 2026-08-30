import { AfterViewInit, Directive, ElementRef, inject, Renderer2 } from "@angular/core";

@Directive({
	selector: "[appFocus]",
})
export class FocusDirective implements AfterViewInit {
	private readonly elementRef = inject(ElementRef<HTMLElement>);
	private readonly renderer = inject(Renderer2);

	ngAfterViewInit(): void {
		this.renderer.setAttribute(this.elementRef.nativeElement, "tabindex", "-1");
		this.elementRef.nativeElement.focus({ preventScroll: false });
	}
}
