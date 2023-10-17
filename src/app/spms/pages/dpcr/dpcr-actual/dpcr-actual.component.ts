import { Component, inject, OnInit } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';

@Component({
  selector: 'app-dpcr-actual',
  templateUrl: './dpcr-actual.component.html',
  styleUrls: ['./dpcr-actual.component.css'],
})
export class DpcrActualComponent implements OnInit {
  dpcrService = inject(DpcrService);
  dpcrMfoes: any = this.dpcrService.dpcrData();

  ngOnInit(): void {
    this.dpcrService.GetDpcrData();
    console.log('dpcrmfoeeeess', this.dpcrMfoes);
  }

  get dpcrMfoesData(): { [key: number]: any[] } {
    const groupedData: { [key: number]: any[] } = this.dpcrMfoes.data.reduce(
      (acc: any, data: any) => {
        const { categoryId } = data;
        if (acc[categoryId]) {
          acc[categoryId].push(data);
        } else {
          acc[categoryId] = [data];
        }
        return acc;
      },
      {}
    );
    return groupedData;
  }

  categoryName(cat: any) {
    let catName = '';
    switch (cat) {
      case '1':
        catName = 'STRATEGIC';
        break;
      case '2':
        catName = 'CORE';
        break;
      case '3':
        catName = 'SUPPORT';
        break;
      default:
        break;
    }

    return catName ? catName + ' FUNCTION' : 'NO FUNCTION';
  }
}
