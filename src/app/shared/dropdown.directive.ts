import { Directive, HostListener, ElementRef, Renderer2,HostBinding } from '@angular/core';

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open') dropDownOpened=false;
    @HostListener('click') toggleDropdown(event: Event) {
    this.dropDownOpened=!this.dropDownOpened;
}

constructor(private elementRef:ElementRef, private renderer:Renderer2){}
}