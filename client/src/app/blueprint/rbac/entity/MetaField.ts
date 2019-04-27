import { FieldConfig } from "app/libs/meta-ui/util/meta/FieldConfig";
import { MetaCom } from "app/libs/meta-ui/util/meta/MetaCom";

/**
 * queryTemplate
 * 元数据
 */
export class MetaField {
    id?: number;
    objectCode?: string;
    isQuery?: boolean;
    isShow?: boolean;
    isUpdate?: boolean;
    placeholder?: string;
    config?: any | FieldConfig;
    fieldType?: string;
    fieldName?: string;
    recno?: number;
    alias?: string;
    presetValue?: string;
    required?: boolean;
    displayWidth?: number;
    metaObject?: MetaCom
}