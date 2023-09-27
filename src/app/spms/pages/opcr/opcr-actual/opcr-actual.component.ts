import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-opcr-actual',
  templateUrl: './opcr-actual.component.html',
  styleUrls: ['./opcr-actual.component.css']
})
export class OpcrActualComponent {
 
    mfo = [
    {
      MFOId: "MFO1234",
      mfo: "Sample MFO 1 ",
      category: 1,
      si: [{ indicatorId: "IND1234", indicator: "Sample IND 1", target: 10 },{ indicatorId: "IND121314", indicator: "Sample IND 4", target: 50} ],
    },
    {
      MFOId: "MFO5678",
      mfo: "Sample MFO 2",
      category: 2,
      si: [{ indicatorId: "IND5678", indicator: "Sample IND 2", target: 20 }],
    },
    {
      MFOId: "MFO91011",
      mfo: "Sample MFO 3",
      category: 3,
      si: [{ indicatorId: "IND91011", indicator: "Sample IND 3", target: 30 }],
    }
  ];

  mfoSelected = [
   
    {
      MFOId: "MFO91112",
      mfo: "Sample MFO 4",
      category: 3,
      si: [{ indicatorId: "IND91112", indicator: "Sample IND 4", target: 60 }],
    }
  ];

  drop(event: CdkDragDrop<any>) {

    console.log(event.previousContainer.data)
    console.log(event.previousIndex)

    console.log(event.container.data)
    console.log(event.currentIndex)

    if (event.previousContainer === event.container) {
      // console.log(event.previousContainer)
      // console.log(event.container)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  drop2(event: CdkDragDrop<any>, mfo:any, si:any) {
    console.log(mfo)
    console.log(si)

    if (event.previousContainer === event.container) {
    
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  add(index:number, item:any){
    if (index >= 0 && index < this.mfo.length) {
      this.mfo.splice(index, 1); // Remove one element at the specified index
      this.mfoSelected.push(item);
  }
  }

  remove(index:number, item:any){
    if (index >= 0 && index < this.mfoSelected.length) {
      this.mfoSelected.splice(index, 1); // Remove one element at the specified index
      this.mfo.push(item);
  }
  }
}
