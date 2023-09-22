import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { SpmsApiService } from "../../../service/api/spms-api.service";
import { api } from "../../../service/api/connection";
@Injectable({
  providedIn: "root",
})
export class MfoService {
  mfo:Observable<any[]> = of( [
    {
      MFOId: "MFO1234",
      MFO: "Sample MFO 1",
      category: 1,
      si: [{ indicatorId: "IND1234", indicator: "Sample IND 1", target: 10 },{ indicatorId: "IND121314", indicator: "Sample IND 4", target: 50} ],
    },
    {
      MFOId: "MFO5678",
      MFO: "Sample MFO 2",
      category: 2,
      si: [{ indicatorId: "IND5678", indicator: "Sample IND 2", target: 20 }],
    },
    {
      MFOId: "MFO91011",
      MFO: "Sample MFO 3",
      category: 3,
      si: [{ indicatorId: "IND91011", indicator: "Sample IND 3", target: 30 }],
    }
  ]);

  constructor(private http: HttpClient, private url: SpmsApiService) {}

  GetMFOes(officeId: string) {
    return this.http.get<any[]>(api + this.url.get_mfoes(officeId), {
      responseType: "json",
    });
  }

  SearchMfoOffice(payload: any) {
    return this.http.post<any[]>(api + this.url.post_mfo_search_office(), payload , {
      responseType: "json",
    });
  }

  AddMFO() {}

 
}
