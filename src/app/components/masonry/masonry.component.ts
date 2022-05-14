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
    window.addEventListener('resize', () => {});
  }

  ngAfterViewChecked(): void {
    this.computeWrappersPositions();
  }

  private computeWrappersPositions() {
    if (!this.container.nativeElement.hasChildNodes())
      return;
    const { width: containerWidth } = this.container.nativeElement.getBoundingClientRect();
    const nbColumns = Math.floor(containerWidth / this.columnWidth);
    const offsetX = containerWidth % this.columnWidth * 0.5;
    const columnsHeights = new Array<number>(nbColumns);
    columnsHeights.fill(0);
    let idx = 0;

    this.container.nativeElement.childNodes.forEach((node) => {
      const nodeElement: HTMLElement = node as HTMLElement;
      if (nodeElement.id !== this.itemName)
        return;
      const columnIdx = idx % nbColumns;
      const posX = offsetX + columnIdx * this.columnWidth;
      const posY = columnsHeights[columnIdx];
      nodeElement.style.transform = `translate(${posX}px, ${posY}px)`;
      const { height } = nodeElement.getBoundingClientRect();
      columnsHeights[columnIdx] += height;
      idx++;
    });

    const maxColumnHeigth = Math.max(...columnsHeights);
    this.container.nativeElement.style.height = `${maxColumnHeigth}px`;
  }

}
