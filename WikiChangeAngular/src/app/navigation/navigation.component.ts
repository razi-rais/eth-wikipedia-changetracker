import { Component, OnInit, Input, Output, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() bodyClassChange = new EventEmitter<string>();
  @Input() bodyClass: string;
  activeMenu = null;

  menu = [
    {
      id: 'home',
      name: 'Home',
      icon: 'fa fa-home',
      subStyle: '',
      subMenu: [
        {
          name: 'Dashboard',
          routerLink: '/dashboard',
        }
      ]
    },
    {
      id: 'watch',
      name: 'Watch a Wiki',
      icon: 'fa fa-edit',
      subStyle: '',
      subMenu: [
        {
          name: 'Watch',
          routerLink: '/watch',
        }
      ]
    },
    {
      id: 'config',
      name: 'Config',
      icon: 'fa fa-edit',
      subStyle: '',
      subMenu: [
        {
          name: 'Config',
          routerLink: '/config',
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
    this.activeMenu = this.menu[0];
  }

  toggleMenu() {
    this.bodyClass = this.bodyClass === 'nav-md' ? 'nav-sm' : 'nav-md';
    this.bodyClassChange.emit(this.bodyClass);
  }

  onMenuClick(menu) {
    switch (this.bodyClass) {
      case 'nav-md':
        this.activeMenu = this.activeMenu === menu ? null : menu;
        break;
      case 'nav-sm':
        if (this.activeMenu === menu) {
          if (menu.subStyle) {
            this.activeMenu = null;
            menu.subStyle = null;
            break;
          }
        } else if (this.activeMenu !== null) {
          this.activeMenu.subStyle = null;
        }
        this.activeMenu = menu;
        menu.subStyle = { 'display': 'block' };
        break;
    }
  }

  @HostListener('document:click', ['$event.target'])
  hideSubMenu(target) {
    if (this.activeMenu && this.activeMenu.subStyle && this.bodyClass === 'nav-sm' && !this.elementOrParentsHasClass(target, 'main_menu')) {
      this.activeMenu.subStyle = null;
    }
  }

  elementOrParentsHasClass(el, cssClass) {
    while (el) {
      if (el.className.indexOf('main_menu') >= 0) { return true; }
      el = el.parentElement;
    }
    return false;
  }
}
