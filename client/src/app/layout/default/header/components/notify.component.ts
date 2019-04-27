import { Component, ViewChild } from '@angular/core';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { NoticeItem, NoticeIconList } from '@delon/abc';
import { CommonService } from 'app/libs/meta-ui/service/common.service';
import { StorageService } from 'app/libs/meta-ui/service/storage.service';
import { Router } from '@angular/router';
import { EntityEnum } from '../../../../entity.enum';
// import { MsgNotify } from 'app/projects/hk/entity/MsgNotify';
// import { MsgTypeEnum } from 'app/projects/hk/enum/MsgType.enum';
import { QueryParam } from 'app/libs/meta-ui/util/stq/QueryParameter';
import { QueryObject } from 'app/libs/meta-ui/util/stq/QueryObject';

/**
 * 菜单通知
 */
@Component({
  selector: 'header-notify',
  template: `
  <notice-icon
    [data]="data"
    [count]="count"
    [loading]="loading"
    (select)="select($event)"
    (clear)="clear($event)"
    (popoverVisibleChange)="loadData()"></notice-icon>
  `,
})
export class HeaderNotifyComponent {
  data: NoticeItem[] = [
    {
      title: '通知',
      list: [],
      emptyText: '你已查看所有通知',
      emptyImage:
        'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
      clearText: '清空通知',
    },
    {
      title: '消息',
      list: [],
      emptyText: '您已读完所有消息',
      emptyImage:
        'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg',
      clearText: '清空消息',
    },
    {
      title: '待办',
      list: [],
      emptyText: '你已完成所有待办',
      emptyImage:
        'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg',
      clearText: '清空待办',
    },
  ];
  count = 5;
  loading = false;

  constructor(private msg: NzMessageService,
    private commonService: CommonService,
    private store: StorageService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  async ngAfterViewInit() {
    let param = new QueryParam();
    // let condtions = QueryObject.Or([{ userId: this.store.trueUser.id }, { orgId: this.store.trueUser.orgId as number }]);
    // param.queryConditions = condtions;

    // let msgs = await this.commonService.singleTableQueryPageParameter(EntityEnum.MsgNotify, param);
    // msgs.paging.rows.forEach(msg => {
    // let notify = this.notification.info((msg as MsgNotify).title, msg.content);
    // console.log(notify)
    // });

  }
  @ViewChild('template') template;

  updateNoticeData(notices: NoticeIconList[]): NoticeItem[] {
    const data = this.data.slice();
    data.forEach(i => (i.list = []));

    notices.forEach(item => {
      const newItem = { ...item };
      if (newItem.datetime)
        newItem.datetime = distanceInWordsToNow(item.datetime, {
          locale: (window as any).__locale__,
        });
      if (newItem.extra && newItem.status) {
        newItem.color = {
          todo: undefined,
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newItem.status];
      }
      data.find(w => w.title === newItem.type).list.push(newItem);
    });
    return data;
  }

  async loadData() {
    if (this.loading) return;
    this.loading = true;
    let param = new QueryParam();
    let condtions = QueryObject.Or([{ userId: this.store.trueUser.id }, { orgId: this.store.trueUser.orgId as number }]);
    param.queryConditions = condtions;
    let msgs = await this.commonService.singleTableQueryPageParameter(EntityEnum.MsgNotify, param);

    // let data = msgs.paging.rows.map((msg: MsgNotify) => {
    //   let notifyData: NoticeIconList = { title: msg.title, id: msg.id, datetime: msg.createTime as any };
    //   if (msg.msgType == MsgTypeEnum[MsgTypeEnum.Notify] as any) {
    //     notifyData.type = "通知";
    //     notifyData.avatar = 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png';
    //   } else if (msg.msgType == MsgTypeEnum[MsgTypeEnum.Task] as any) {
    //     notifyData.type = "待办";
    //     notifyData.description = msg.content;
    //     notifyData.extra = "待审核";
    //   }
    //   notifyData.viewName = msg.viewName;
    //   notifyData.dataId = JSON.parse(msg.addition).id;
    //   return notifyData;
    // })
    // console.log(msgs);
    // setTimeout(() => {
    //   this.data = this.updateNoticeData(data);
    //   this.loading = false;
    // }, 1000);
  }

  clear(type: string) {
    this.msg.success(`清空了 ${type}`);
  }

  select(res: any) {
    console.log(res);
    this.router.navigateByUrl(`/admin/user/dynamic-menu/?viewType=info&&dataId=${res.item.dataId}&&viewName=${res.item.viewName}`)
    // this.msg.success(`打开 ${res.title} 的 ${res.item.title} 视图${res.item.dataId} ${res.item.viewName}`);
  }

  defaultLoadData: NoticeIconList[] = [
    {
      id: '000000001',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: '通知',
    },
    {
      id: '000000002',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: '通知',
    },
    {
      id: '000000003',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: '这种模板可以区分多种通知类型',
      datetime: '2017-08-07',
      read: true,
      type: '通知',
    },
    {
      id: '000000004',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      datetime: '2017-08-07',
      type: '通知',
    },
    {
      id: '000000005',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '内容不要超过两行字，超出时自动截断',
      datetime: '2017-08-07',
      type: '通知',
    },
    {
      id: '000000006',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '曲丽丽 评论了你',
      description: '描述信息描述信息描述信息',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000007',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '朱偏右 回复了你',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000008',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '标题',
      description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000009',
      title: '任务名称',
      description: '任务需要在 2017-01-12 20:00 前启动',
      extra: '未开始',
      status: 'todo',
      type: '待办',
    },
    {
      id: '000000010',
      title: '第三方紧急代码变更',
      description:
        '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '马上到期',
      status: 'urgent',
      type: '待办',
    },
    {
      id: '000000011',
      title: '信息安全考试',
      description: '指派竹尔于 2017-01-09 前完成更新并发布',
      extra: '已耗时 8 天',
      status: 'doing',
      type: '待办',
    },
    {
      id: '000000012',
      title: 'ABCD 版本发布',
      description:
        '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '进行中',
      status: 'processing',
      type: '待办',
    },
  ];
}
