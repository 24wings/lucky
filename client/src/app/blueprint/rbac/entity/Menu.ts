import { Role } from "./Role";

/**
 * Menu 菜单
 */
export class Menu {
    menuId?: number;
    text?: string;
    i18n?: string;
    parentId?: number | any;
    link?: string;
    externalink?: string;
    target?: string;
    icon?: string;
    badge?: number;
    badge_dot?: boolean;
    badge_status?: string;
    hide?: boolean;
    hideInBreadcrumb?: boolean;
    acl?: string;
    shortcut?: number;
    shortcut_root?: number;
    reuse?: number;
    menuType?: number;
    creatorId?: number;
    config?: string;
    menuCode?: number;
    roles?: Role[];
}
