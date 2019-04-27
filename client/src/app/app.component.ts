import {
    Component,
    HostBinding,
    OnInit,
    Renderer2,
    ElementRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SettingsService, TitleService } from '@delon/theme';
import { VERSION as VERSION_ALAIN } from '@delon/theme';
import { VERSION as VERSION_ZORRO, NzModalService } from 'ng-zorro-antd';
import { MyHttpService } from 'app/libs/meta-ui/service/http.service';
import { IDataStrategy } from 'app/libs/meta-ui/service/data-strategy/IDataStrategy';
import { OnlineStrategyService } from 'app/libs/meta-ui/service/data-strategy/OnlineStrategy.service';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-root',
    template: `
  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
    visible = false;
    open(): void {
        this.visible = true;
    }
    close(): void {
        this.visible = false;
    }
    @HostBinding('class.layout-fixed')
    get isFixed() {
        return this.settings.layout.fixed;
    }
    @HostBinding('class.layout-boxed')
    get isBoxed() {
        return this.settings.layout.boxed;
    }
    @HostBinding('class.aside-collapsed')
    get isCollapsed() {
        return this.settings.layout.collapsed;
    }
    @HostBinding('class.color-weak')
    get isColorWeak() {
        return this.settings.layout.colorWeak;
    }
    constructor(
        public myHttp: MyHttpService,
        el: ElementRef,
        renderer: Renderer2,
        private settings: SettingsService,
        private router: Router,
        private titleSrv: TitleService,
        private modalSrv: NzModalService,
        private httpClient: HttpClient,
        // private appConfig: AppConfig,
        // private commonService: CommonService,
        // private devService: DevService,
        private dataStrategy: IDataStrategy
    ) {
        renderer.setAttribute(
            el.nativeElement,
            'ng-alain-version',
            VERSION_ALAIN.full,
        );
        renderer.setAttribute(
            el.nativeElement,
            'ng-zorro-version',
            VERSION_ZORRO.full,
        );
    }

    async ngOnInit() {
        // this.httpClient.post('http://localhost:9090/field', { sql: "select * from user" }).toPromise();
        this.httpClient.get('assets/app.config.json').toPromise().then(rtn => {
            if (rtn) {
                localStorage.setItem("config", JSON.stringify(rtn));
            }
        })
        // let data = SyncDataRegisterFactory.exportSyncDatas();
        // let database = data.find(db => db.database == 'xfd_fk');

        if (this.dataStrategy instanceof OnlineStrategyService) {
            // await this.myHttp.Post('/dev/sync', database);
        }
        this.router.events
            .pipe(filter(evt => evt instanceof NavigationEnd))
            .subscribe(() => {
                this.titleSrv.setTitle();
                this.modalSrv.closeAll();
            });
        // let card = await this.getCardNo();
        // alert(card);
    }

}
