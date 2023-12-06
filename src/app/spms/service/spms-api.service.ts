import { Injectable } from '@angular/core';
import { AnyRecord } from 'dns';
import { api } from 'src/app/connection';
@Injectable({
  providedIn: 'root',
})
export class SpmsApiService {
  constructor() {}
  get_employee_list = () =>'/vPMEmployee';

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
  put_opcr = () => `/tPMOpcrs`;
  delete_opcr = (opcrId: string) => `/tPMOpcrs/${opcrId}`;

  get_ipcrs = (year: string, divisionId: string, userId: string) =>
    `/tPMIpcrs/${year}/${divisionId}/${userId}`;
  post_ipcr = () => `/tPMIpcrs`;
  put_ipcr_status = () => `/tPMIpcrs/Status`;
  view_get_dpcr_ipcr = (divisionId: string, isCommon: number) =>
    `/vPMDpcr_Ipcr/${divisionId}/${isCommon}`;

  get_ipcrdetails = (ipcrId: string) => `/vPMIpcrDatas/${ipcrId}`;
  get_ipcrdetails_remaining = (dpcrDataId: string) =>
    `/tPMIpcrDatas/remaining/${dpcrDataId}`;
  get_ipcrdetails_remainingST = (subTaskId: string) =>
    `/tPMIpcrDataSubTasks/remainingSt/${subTaskId}`;
  get_ipcrdetails_wSub = (ipcrId: string) => `/tPMIpcrDatas/list/${ipcrId}`;
  post_ipcrData = () => `/tPMIpcrDatas`;
  put_ipcrData = () => `/tPMIpcrDatas`;
  put_ipcrSubData = () => `/tPMIpcrDataSubTasks`;
  post_ipcrSubData = () => `/tPMIpcrDataSubTasks`;
  delete_ipcr = (ipcrId: string) => `/tPMIpcrs/${ipcrId}`;
  delete_ipcrdata = (ipcrDataId: string) => `/tPMIpcrDatas/${ipcrDataId}`;
  delete_ipcrdata_st = (ipcrSubtaskId: string) =>
    `/tPMIpcrDataSubTasks/${ipcrSubtaskId}`;

  delete_opcrdata = (opcrDataId: string) => `/tPMOpcrDatas/${opcrDataId}`;
  put_opcrdata = () => `/tPMOpcrDatas`;
  post_opcrdata = () => `/tPMOpcrDatas`;
  get_opcrdetails = (opcrId: string) => `/tPMOpcrDatas/${opcrId}`;

  post_dpcr = () => `/tPMDpcr`;
  put_dpcr = () => `/tPMDpcr`;
  put_dpcr_setactive = (dpcrId: string) => `/tPMDpcr/setactive/${dpcrId}`;
  delete_dpcr = (dpcrId: string) => `/tPMDpcr/${dpcrId}`;
  get_dpcr = (divisionId: string) => `/tPMDpcr/list/${divisionId}`;

  post_dpcr_data = () => `/tPMDpcrData`;
  put_dpcr_data = () => `/tPMDpcrData`;
  delete_dpcr_data = (dpcrDataId: string) => `/tPMDpcrData/${dpcrDataId}`;
  get_dpcr_data_mfoes = (
    dpcrId: string,
    divisionName: string,
    mfoType: number
  ) => `/tPMDpcrData/mfoes/${dpcrId}/${divisionName}/${mfoType}`;
  get_dpcr_data_search_mfoes = (
    dpcrId: string,
    divisionName: string,
    mfoType: number,
    searchMfo: string
  ) =>
    `/tPMDpcrData/searchMfoes/${dpcrId}/${divisionName}/${mfoType}/${searchMfo}`;
  get_dpcr_data = (dpcrId: string) => `/tPMDpcrData/list/${dpcrId}`;
  get_dpcr_data_subtask = (dpcrId: string, mfoId: string) =>
    `/tPMDpcrData/subtask/${dpcrId}/${mfoId}`;

  post_subtask = () => `/tPMSubTask`;
  post_subtask_add_common_mfo = () => `/tPMSubTask/add/common_mfo`;
  put_subtask = () => `/tPMSubTask`;
  delete_subtask = (subTaskId: string) => `/tPMSubTask/${subTaskId}`;

  post_ots = () => `/tPMOts`;
  get_ots = () => `/tPMOts`;

  get_officedivision = (officeId: any) => `/tPMOfficeDivisions/${officeId}`;
  post_officedivision = () => `/tPMOfficeDivisions`;
  put_officedivision = () => `/tPMOfficeDivisions`;
  delete_officedivision = (divisionId:any) => `/tPMOfficeDivisions/${divisionId}`;

  get_utility_role = () =>'/tPMRole';
  post_utility_employee_role = (officeId:string) =>`/vPMEmployee/employee_role?officeId=${officeId}`;
  get_utility_user_role = (EIC: string) =>`/tPMUserRole/user_role/${EIC}`;
  post_utility_user_role = (EIC:string) =>`/tPMUserRole?EIC=${EIC}`;
  delete_utility_user_role = (transId: string) => `/tPMUserRole/${transId}`;
  get_user_profile_picture =  (EIC: string) => `/vPMEmployee/profile_picture?EIC=${EIC}`;

  get_ipcr_data = (ipcrId: string) => `/tPMIpcrDatas/list/${ipcrId}`;

  post_employee_no_division = () => `/vPMEmployee/employee/no_division`;
  post_employee_division = () => `/vPMEmployee/employee/division/list`;
  post_employee_add_division = () => `/vPMEmployee/employee/add/division`;
  put_employee_update_division = () => `/vPMEmployee/employee/update/division`;
  delete_employee_division = (EIC:string) => `/vPMEmployee/employee/remove/division/${EIC}`;
  get_employee_office_role = () => `/vPMEmployee/employee/office/role`;
  put_employee_office_role = () => `/vPMEmployee/employee/office/role`;
  delete_employee_office_role = (EIC:string) => `/vPMEmployee/employee/office/role/${EIC}`;

  get_office = () => `/tPMOffice`;
  post_employee_assign_office_focal = () => `/vPMEmployee/employee/assign/office/focal`;
}
