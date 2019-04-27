using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wings.Projects.Web.Entity.Rbac
{
    /// <summary>
    /// 菜单
    /// </summary>
    [Table("menu")]
    public class Menu
    {
        /// <summary>
        /// 主键
        /// </summary>
        /// <value></value>
        public int id { get; set; }
        /// <summary>
        /// 菜单文本
        /// </summary>
        /// <value></value>
        public string text { get; set; }
        /// <summary>
        /// 上级Id
        /// </summary>
        /// <value></value>
        public int parentId { get; set; } = 0;
        /// <summary>
        /// 链接
        /// </summary>
        /// <value></value>
        public string link { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        /// <value></value>
        public DateTime? createTime { get; set; } = DateTime.Now;
        /// <summary>
        /// 菜单列表
        /// </summary>
        /// <value></value>
        public string menuIds { get; set; }

    }
}