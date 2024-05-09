import { Injectable } from '@angular/core';
import { AnyRecord } from 'dns';
import { api } from 'src/app/connection';
@Injectable({
  providedIn: 'root',
})
export class SpmsApiService {
  constructor() {}

  get_overview_mfo_target_offices = () => '/Overview/target/mfo/offices';

  get_employee_list = () => '/vPMEmployee';

  get_mfoes_ipcr = () => `/tPMMFOes/ipcr`;
  get_mfoes = (officeId: string, type: number) => `/tPMMFOes/${officeId}/${type}`;
  post_mfo_search_office = () => `/tPMMFOes/Search`;
  post_mfo = () => `/tPMMFOes`;
  put_mfo = () => `/tPMMFOes`;
  delete_mfo = (mfoId: string) => `/tPMMFOes/${mfoId}`;
  put_mfo_category = (mfoId: string, categoryId: number) => `/tPMMFOes/category/${mfoId}/${categoryId}`;

  get_division_mfoes = (divisionId: string) => `/tPMMFOes/division/${divisionId}`;
  post_search_division_mfo = () => `/tPMMFOes/Search/Division/MFO`;

  post_success_indicator = () => `/tPMMFOIndicators`;
  put_success_indicator = () => `/tPMMFOIndicators`;
  delete_success_indicator = (indicatorId: string) => `/tPMMFOIndicators/${indicatorId}`;

  post_standard = () => `/tPMMFOStandards`;
  put_standard = () => `/tPMMFOStandards`;

  get_opcrs = (year: string, officeId: string) => `/tPMOpcrs/${year},${officeId}`;
  post_opcr = () => `/tPMOpcrs`;
  put_opcr = () => `/tPMOpcrs/Active`;
  put_opcr_submit = (opcrId: string) => `/tPMOpcrs/submit_opcr/${opcrId}`;
  edit_opcr_details = () => `/tPMOpcrs/Details`;
  delete_opcr = (opcrId: string) => `/tPMOpcrs/${opcrId}`;
  get_uncommited_division = (year: any, officeId: string) => `/tPMOpcrs/UncommitedDivision/${year},${officeId}`;

  get_ipcrs = (year: string, divisionId: string, userId: string) => `/tPMIpcrs/${year}/${divisionId}/${userId}`;
  post_ipcr = () => `/tPMIpcrs`;
  put_ipcr_status = () => `/tPMIpcrs/Status`;
  put_ipcr_setactive = (ipcrId: string, status: number) => `/tPMIpcrs/setactive/${ipcrId}/${status}`;
  view_get_dpcr_ipcr = (ipcrId: string, divisionId: string, isCommon: number) =>  `/vPMDpcr_Ipcr/${ipcrId}/${divisionId}/${isCommon}`;

  get_ipcrdetails = (ipcrId: string) => `/vPMIpcrDatas/${ipcrId}`;
  get_ipcrdetails_remaining = (dpcrDataId: string) => `/tPMIpcrDatas/remaining/${dpcrDataId}`;
  get_ipcrdetails_remainingST = (subTaskId: string) => `/tPMIpcrDataSubTasks/remainingSt/${subTaskId}`;
  get_ipcrdetails_wSub = (ipcrId: string) => `/tPMIpcrDatas/list/${ipcrId}`;
  post_ipcrData = () => `/tPMIpcrDatas`;
  put_ipcrData = () => `/tPMIpcrDatas`;
  put_ipcrdata_sortby_mfo = (ipcrId: string) => `/tPMIpcrDatas/${ipcrId}/sortIpcrMfoes`;
  get_ipcr_actual_report = (ipcrId: string) => `/tPMIpcrDatas/GetIpcrReport/${ipcrId}`;
  get_ipcr_target_report = (ipcrId: string) => `/tPMIpcrDatas/GetIpcrTargetReport/${ipcrId}`;

  put_ipcrSubData = () => `/tPMIpcrDataSubTasks`;
  post_ipcrSubData = () => `/tPMIpcrDataSubTasks`;
  delete_ipcr = (ipcrId: string) => `/tPMIpcrs/${ipcrId}`;
  delete_ipcrdata = (ipcrDataId: string) => `/tPMIpcrDatas/${ipcrDataId}`;
  delete_ipcrdata_st = (ipcrSubtaskId: string) => `/tPMIpcrDataSubTasks/${ipcrSubtaskId}`;
  put_ipcr_data_update_mfo_category = (ipcrId: string, MFOId:string, category:number) => `/tPMIpcrDatas/update/${ipcrId}/${MFOId}/${category}/ipcr_mfo_category`;

  get_ipcr_data_actual = (ipcrId: string) => `/tPMIpcrDatas/actual/list/${ipcrId}`;

  delete_opcrdata = (opcrDataId: string) => `/tPMOpcrDatas/${opcrDataId}`;
  put_opcrdata = () => `/tPMOpcrDatas`;
  put_opcrdata_sortby_mfo = (opcrId: string) => `/tPMOpcrDatas/${opcrId}/sortOpcrMfoes`;
  post_opcrdata = () => `/tPMOpcrDatas`;
  get_opcrdetails = (opcrId: string) => `/tPMOpcrDatas/${opcrId}`;
  get_opcr_data_actual = (opcrId: string) => `/tPMOpcrDatas/actual/list/${opcrId}/try`;

  post_dpcr = () => `/tPMDpcr`;
  put_dpcr = () => `/tPMDpcr`;
  put_dpcr_setactive = (dpcrId: string, status: number) => `/tPMDpcr/setactive/${dpcrId}/${status}`;
  delete_dpcr = (dpcrId: string) => `/tPMDpcr/${dpcrId}`;
  get_dpcr = (year: number, divisionId: string) => `/tPMDpcr/list/${year}/${divisionId}`;

  get_dpcr_data_actual = (dpcrId: string) => `/tPMDpcrData/actual/list/${dpcrId}`;
  post_dpcr_data = () => `/tPMDpcrData`;
  put_dpcr_data = () => `/tPMDpcrData`;
  put_dpcr_data_update_mfo_category = (dpcrId: string, MFOId:string, category:number) => `/tPMDpcrData/update/${dpcrId}/${MFOId}/${category}/dpcr_mfo_category`;
  delete_dpcr_data = (dpcrDataId: string) => `/tPMDpcrData/${dpcrDataId}`;
  get_dpcr_data_mfoes = (
    officeId: string,
    dpcrId: string,
    divisionName: string,
    mfoType: number
  ) => `/tPMDpcrData/mfoes/${officeId}/${dpcrId}/${divisionName}/${mfoType}`;
  get_dpcr_data_search_mfoes = (
    officeId: string,
    dpcrId: string,
    divisionName: string,
    mfoType: number,
    searchMfo: string
  ) =>
    `/tPMDpcrData/searchMfoes/${officeId}/${dpcrId}/${divisionName}/${mfoType}/${searchMfo}`;
  put_dpcrdata_sortby_mfo = (dpcrId: string) => `/tPMDpcrData/${dpcrId}/sortDpcrMfoes`;
  get_dpcr_data_target_report = (dpcrId: string) => `/tPMDpcrData/GetDpcrTargetReport/${dpcrId}`;

  get_dpcr_data_mfoes_division = (
    officeId: string,
    divisionId: string,
    dpcrId: string,
    divisionName: string,
    searchMfo: string
  ) =>
    `/tPMDpcrData/mfoes/division/${officeId}/${divisionId}/${dpcrId}/${divisionName}/${searchMfo}`;

  get_dpcr_data = (dpcrId: string) => `/tPMDpcrData/list/${dpcrId}`;
  get_dpcr_data_subtask = (dpcrId: string, mfoId: string) => `/tPMDpcrData/subtask/${dpcrId}/${mfoId}`;
  get_dpcr_mfo_ots = (dpcrDataId: string) => `/tPMDpcrData/${dpcrDataId}/dpcr/mfo_ots`;


  post_subtask = () => `/tPMSubTask`;
  post_subtask_add_common_mfo = () => `/tPMSubTask/add/common_mfo`;
  put_subtask = () => `/tPMSubTask`;
  delete_subtask = (subTaskId: string) => `/tPMSubTask/${subTaskId}`;

  post_ots = () => `/tPMOts`;
  put_ots = () => `/tPMOts`;
  get_ots = () => `/tPMOts`;
  get_check_user_open_ipcr = () => `/tPMOts/check_user_open_ipcr`;
  delete_ots = (otsId: string) => `/tPMOts/${otsId}`;
  post_ots_add_to_group = () => `/tPMOts/AddToGroupOts`;

  post_ots_request = () => `/tPMOts/OtsRequest`;
  get_ots_request_summary = () => `/tPMOts/Summary/${localStorage.getItem('officeRoleId')}`;
  get_ots_mfo_group = (
    opcrDataId: string,
    dpcrDataId: string,
    subtaskId: string
  ) => `/tPMOts/ots/${opcrDataId}/${dpcrDataId}/${subtaskId}/mfo_group`;
  put_ots_request_overRide = () => `/tPMOts/OTS_Request/OverRide`;
  put_ots_request_approve = () => `/tPMOts/OTS_Request/Approve`;
  post_ots_get_list_user_mfo = () => `/tPMOts/get_list_user_mfo`;
  post_ots_group = () => `/tPMOts/GroupOts`;

  get_officedivision = (officeId: any) => `/tPMOfficeDivisions/${officeId}`;
  post_officedivision = () => `/tPMOfficeDivisions`;
  put_officedivision = () => `/tPMOfficeDivisions`;
  delete_officedivision = (divisionId: any) => `/tPMOfficeDivisions/${divisionId}`;

  get_utility_role = () => '/tPMRole';
  post_utility_employee_role = (officeId: string) => `/vPMEmployee/employee_role?officeId=${officeId}`;
  get_utility_user_role = (EIC: string) => `/tPMUserRole/user_role/${EIC}`;
  post_utility_user_role = (EIC: string) => `/tPMUserRole?EIC=${EIC}`;
  delete_utility_user_role = (transId: string) => `/tPMUserRole/${transId}`;
  get_user_profile_picture = (EIC: string) => `/vPMEmployee/profile_picture?EIC=${EIC}`;

  get_ipcr_data = (ipcrId: string) => `/tPMIpcrDatas/list/${ipcrId}`;

  post_employee_no_division = () => `/vPMEmployee/employee/no_division`;
  post_employee_division = () => `/vPMEmployee/employee/division/list`;
  post_employee_add_division = () => `/vPMEmployee/employee/add/division`;
  put_employee_update_division = () => `/vPMEmployee/employee/update/division`;
  delete_employee_division = (EIC: string) => `/vPMEmployee/employee/remove/division/${EIC}`;
  get_employee_office_role = () => `/vPMEmployee/employee/office/role`;
  put_employee_office_role = () => `/vPMEmployee/employee/office/role`;
  delete_employee_office_role = (EIC: string) => `/vPMEmployee/employee/office/role/${EIC}`;

  get_office = () => `/tPMOffice`;
  post_employee_assign_office_focal = () => `/vPMEmployee/employee/assign/office/focal`;

  post_signatories = (typeId: any) => `/tPMSignatories/${typeId}`;
  get_signatories = (typeId: any, officeId: any, divisionId: any) => `/tPMSignatories/${typeId}/${officeId}/${divisionId}`;

  get_logs = () => `/tPMLogs`;
  post_all_logs = () => `/tPMLogs/LogsComplete`;

  post_print_mpor = () => `/tPMIpcrDatas/PrintMPOR`;
  post_print_smpor = () => `/tPMIpcrDatas/PrintSMPOR`;
  post_print_ipcr = () => `/tPMIpcrDatas/PrintIPCR`;
  post_print_mpor_officeHead = () => `/tPMIpcrDatas/OfficeHead`;
}
