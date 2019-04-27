import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { Router, RouteConfigLoadStart, NavigationStart, NavigationError } from '@angular/router';
import { StorageService } from 'app/libs/meta-ui/service/storage.service';
import { CommonService } from 'app/libs/meta-ui/service/common.service';
import { DevService } from 'app/libs/meta-ui/service/dev.service';
import { UserService } from 'app/libs/meta-ui/service/user.service';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isFetching: boolean;
  isClose: boolean = true;
  isCollapsed = false;

  groups: any[] = [];

  shop_user_name: string;
  sendProductOrdersNum: number = 0;

  constructor(
    public _message: NzMessageService,
    public router: Router,
    public storage: StorageService,
    public common: CommonService,
    public dev: DevService,
    public emp: UserService,
    public settings: SettingsService, public msgSrv: NzMessageService
  ) {
    this.router.events.subscribe((evt, ) => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        // debugger
        this.isFetching = true;
      }
      if (evt instanceof NavigationStart) {
        // console.log(evt)
        if (evt.url != '/lock' && this.storage.lockPassword) {
          // console.log(this.router.url, this.storage.lockPassword)
          this.router.navigate(['/lock']);
          return false;
        }
      }
      if (evt instanceof NavigationError) {
        // debugger;
        this.isFetching = false;
        this._message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        return;
      }
      setTimeout(() => {
        // scroll.scrollToTop();
        this.isFetching = false;
      }, 100);
    });
    let menus = this.storage.menuList;
    this.common.resetMenu(menus as any);

  }

  async ngOnInit() { }

  async getAdminInfo() { }
  async getSendProductOrdersNum() { }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

}
