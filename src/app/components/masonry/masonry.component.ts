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
  @Input() columnWidth: number = 240;
  @Input() padding: number = 8;
  private wrapperElementName = '_wrapper-element';
  private lastWindowResizeTime = Date.now();
  private refreshRate = 100;

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      const currentTime = Date.now();
      if (currentTime - this.lastWindowResizeTime <= this.refreshRate)
        return;
      this.computeWrappersPositions();
      this.lastWindowResizeTime = currentTime;
    });
  }

  ngAfterViewChecked(): void {
    this.reloadWrappers();
    this.computeWrappersPositions();
  }

  private reloadWrappers() {
    if (!this.container.nativeElement.hasChildNodes())
      return;
    const childrenCopy: Array<ChildNode> = [];
    this.container.nativeElement.childNodes.forEach(child => { childrenCopy.push(child); });
    childrenCopy.forEach(child => {
      if (child.nodeType !== Node.ELEMENT_NODE)
        return;
      if ((child as HTMLElement).id === this.wrapperElementName) {
        if (!child.hasChildNodes())
          child.remove();
        return;
      }
      const newDiv = document.createElement('div');
      newDiv.id = this.wrapperElementName;
      newDiv.style.position = 'absolute';
      newDiv.style.width = `${this.columnWidth}px`;
      newDiv.style.padding = `${this.padding}px`;
      newDiv.style.transition = '150ms';
      newDiv.appendChild(child);
      this.container.nativeElement.appendChild(newDiv);
    });
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
      if (nodeElement.id !== this.wrapperElementName)
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
