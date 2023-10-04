import { Injectable } from '@angular/core';
import { api } from 'src/app/connection';
@Injectable({
  providedIn: 'root',
})
export class SpmsApiService {
  constructor() {}
  get_mfoes = (officeId: string, type: number) =>
    `/tPMMFOes/${officeId}/${type}`;
  post_mfo_search_office = () => `/tPMMFOes/Search`;
  post_mfo = () => `/tPMMFOes`;
  put_mfo = () => `/tPMMFOes`;
  delete_mfo = (mfoId: string) => `/tPMMFOes/${mfoId}`;

  post_success_indicator = () => `/tPMMFOIndicators`;
  put_success_indicator = () => `/tPMMFOIndicators`;
  delete_success_indicator = (indicatorId: string) =>
    `/tPMMFOIndicators/${indicatorId}`;

  post_standard = () => `/tPMMFOStandards`;
  put_standard = () => `/tPMMFOStandards`;

  get_opcrs = (year: string, officeId: string) =>
    `/tPMOpcrs/${year},${officeId}`;
  get_opcrdetails = (opcrId: string) => `/tPMOpcrDatas/${opcrId}`;
  post_opcr = () => `/tPMOpcrs`;
  post_opcrdata = () => `/tPMOpcrDatas`;
  delete_opcrdata = (opcrDataId: string) => `/tPMOpcrDatas/${opcrDataId}`;
  get_officedivision = (officeId: string) => `/tPMOfficeDivisions/${officeId}`;
}
