import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSearch]',
  standalone: true
})
export class SearchDirective {

  @Input() appSearch!: string; 
  @Input() searchData!: any[]; 

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appSearch'] || changes['searchData']) {
      this.applyFilter();
    }
  }

  private applyFilter(): void {
    const searchTerm = this.appSearch?.toLowerCase() || '';
    const rows = this.el.nativeElement.querySelectorAll('tr'); 

    rows.forEach((row: HTMLElement, index: number) => {
      if (index === 0) return; 
      const cells = row.querySelectorAll('td'); 
      const rowText = Array.from(cells)
        .map((cell) => cell.textContent?.toLowerCase() || '')
        .join(' '); 
      if (rowText.includes(searchTerm)) {
        this.renderer.setStyle(row, 'display', ''); 
      } else {
        this.renderer.setStyle(row, 'display', 'none'); 
      }
    });
  }

}
