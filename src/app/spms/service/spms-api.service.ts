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
  put_mfo_category = (mfoId: string, categoryId: number) =>
    `/tPMMFOes/category/${mfoId}/${categoryId}`;

  post_success_indicator = () => `/tPMMFOIndicators`;
  put_success_indicator = () => `/tPMMFOIndicators`;
  delete_success_indicator = (indicatorId: string) =>
    `/tPMMFOIndicators/${indicatorId}`;

  post_standard = () => `/tPMMFOStandards`;
  put_standard = () => `/tPMMFOStandards`;

  get_opcrs = (year: string, officeId: string) =>
    `/tPMOpcrs/${year},${officeId}`;
  post_opcr = () => `/tPMOpcrs`;

  delete_opcrdata = (opcrDataId: string) => `/tPMOpcrDatas/${opcrDataId}`;
  put_opcrdata = () => `/tPMOpcrDatas`;
  post_opcrdata = () => `/tPMOpcrDatas`;
  get_opcrdetails = (opcrId: string) => `/tPMOpcrDatas/${opcrId}`;

  post_dpcr = () => `/tPMDpcr`;
  put_dpcr = () => `/tPMDpcr`;
  delete_dpcr = (dpcrId: string) => `/tPMDpcr/${dpcrId}`;
  get_dpcr = (divisionId: string) => `/tPMDpcr/list/${divisionId}`;

  post_dpcr_data = () => `/tPMDpcrData`;
  put_dpcr_data = () => `/tPMDpcrData`;
  delete_dpcr_data = (dpcrDataId: string) => `/tPMDpcrData/${dpcrDataId}`;
  get_dpcr_data_mfoes = (dpcrId: string, divisionName: string, mfoType:number) => `/tPMDpcrData/mfoes/${dpcrId}/${divisionName}/${mfoType}`;
  get_dpcr_data_search_mfoes = (dpcrId: string, divisionName: string, mfoType:number, searchMfo:string) => `/tPMDpcrData/searchMfoes/${dpcrId}/${divisionName}/${mfoType}/${searchMfo}`;
  get_dpcr_data = (dpcrId: string) => `/tPMDpcrData/list/${dpcrId}`;

  get_officedivision = (officeId: string) => `/tPMOfficeDivisions/${officeId}`;
}
