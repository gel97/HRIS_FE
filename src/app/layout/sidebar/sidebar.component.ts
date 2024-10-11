import { Component, OnInit, inject } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { UtilsService } from 'src/app/service/utils.service';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuService  = inject(MenuService);
  utilsService = inject(UtilsService);

    faCoffee = faUserDoctor;


  isShowSidebar = this.utilsService.isShowSidebar();

  menu = this.menuService.menu();
  sample: number = 0;
  sample1: number = 0;
  sample2: number = 0;
  sample3: number = 0;

  ngOnInit(): void {
    this.getSPMSMenu();
  }

  setSidebarMobileView(){
    this.utilsService.isShowSidebar.set(!this.utilsService.isShowSidebar())
  }

  getSPMSMenu(){
    this.menuService.GetMenu()
  }

  selectedSystem:string = '';

  toogleSystem(systemName:string){
    this.selectedSystem = this.selectedSystem === systemName ? "" : systemName;
  }

  selectedMenu:string = '';

  toogle(menuName:string){
    this.selectedMenu = this.selectedMenu === menuName ? "" : menuName;
  }

  toggleSubMenu(menuNumber: number): void {
    this.sample = this.sample === menuNumber ? 0 : menuNumber;
  }

  toggleSubMenu1(menuNumber: number): void {
    this.sample1 = this.sample1 === menuNumber ? 0 : menuNumber;
  }
  toggleSubMenu2(menuNumber: number): void {
    this.sample2 = this.sample2 === menuNumber ? 0 : menuNumber;
  }

  toggleSubMenu3(menuNumber: number): void {
    this.sample3 = this.sample3 === menuNumber ? 0 : menuNumber;
  }
}
