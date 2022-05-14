import { Component, OnInit, ElementRef, Input, ViewChild, AfterViewChecked } from '@angular/core';

/**
 * @description This is a custom component I made to emulate a masonry layout
 * Learn more at https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/
 */
@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss']
})
export default class MasonryComponent implements OnInit, AfterViewChecked {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @Input() columnWidth!: number;
  @Input() itemName!: string;

  constructor() { }

  ngOnInit(): void {
    // Hacky solution to trigger ngAfterViewChecked and refresh the masonry
    // when the window is resized
    window.addEventListener('resize', () => { });
  }

  ngAfterViewChecked(): void {
    this.computeWrappersPositions();
  }

  private computeWrappersPositions() {
    if (!this.container.nativeElement.hasChildNodes())
      return;
    const items = this.container.nativeElement.querySelectorAll<HTMLElement>(`#${this.itemName}`);
    if (items.length <= 0)
      return;
    const { width: containerWidth } = this.container.nativeElement.getBoundingClientRect();
    const nbColumns = Math.floor(containerWidth / this.columnWidth);
    const offsetX = containerWidth % this.columnWidth * 0.5;
    const columnsHeights = new Array<number>(nbColumns).fill(0);

    items.forEach((item, idx) => {
      const columnIdx = idx % nbColumns;
      const posX = offsetX + columnIdx * this.columnWidth;
      const posY = columnsHeights[columnIdx];
      item.style.transform = `translate(${posX}px, ${posY}px)`;
      const { height } = item.getBoundingClientRect();
      columnsHeights[columnIdx] += height;
    });

    const maxColumnHeigth = Math.max(...columnsHeights);
    this.container.nativeElement.style.height = `${maxColumnHeigth}px`;
  }

}
