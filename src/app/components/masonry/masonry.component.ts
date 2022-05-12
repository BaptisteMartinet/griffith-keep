import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss']
})
export default class MasonryComponent implements OnInit, AfterViewChecked {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  private wrappers: Array<HTMLDivElement> = [];
  private columnWidth = 240;

  constructor() { }

  ngOnInit(): void {
    window.onresize = () => { this.computeWrappers(); };
  }

  ngAfterViewChecked(): void {
    const childrenCopy: Array<ChildNode> = [];
    this.container.nativeElement.childNodes.forEach(child => { childrenCopy.push(child); });
    childrenCopy.forEach(child => {
      if ((child as HTMLElement).id !== 'masonry-element')
        return;
      const newDiv = document.createElement('div');
      newDiv.style.position = 'absolute';
      newDiv.style.width = `${this.columnWidth}px`;
      newDiv.style.padding = '.5em';
      newDiv.style.transition = '150ms';
      newDiv.appendChild(child);
      this.container.nativeElement.appendChild(newDiv);
      this.wrappers.push(newDiv);
    });
    this.computeWrappers();
  }

  private computeWrappers() {
    const { width: containerWidth } = this.container.nativeElement.getBoundingClientRect();
    const nbColumns = Math.floor(containerWidth / this.columnWidth);
    const offsetX = containerWidth % this.columnWidth * 0.5;
    const columnsHeights = new Array<number>(nbColumns);
    columnsHeights.fill(0);

    this.wrappers.forEach((wrapper, idx) => {
      const columnIdx = idx % nbColumns;
      const posX = offsetX + columnIdx * this.columnWidth;
      const posY = columnsHeights[columnIdx];
      wrapper.style.transform = `translate(${posX}px, ${posY}px)`;
      const { height } = wrapper.getBoundingClientRect();
      columnsHeights[columnIdx] += height;
    });

    const maxColumnHeigth = Math.max(...columnsHeights);
    this.container.nativeElement.style.height = `${maxColumnHeigth}px`;
  }

}
