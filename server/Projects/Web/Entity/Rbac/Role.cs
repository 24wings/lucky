using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Wings.Base.Common.Entity;

namespace Wings.Projects.Web.Entity.Rbac
{
    /// <summary>
    /// 用户管理
    /// </summary>
    [Table("Role")]
    public class Role
    {
        /// <summary>
        /// 主键
        /// </summary>
        /// <value></value>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        /// <summary>
        /// 昵称
        /// </summary>
        /// <value></value>
        public string roleName { get; set; }
        /// <summary>
        /// 菜单字符串
        /// </summary>
        /// <value></value>

        public string menuIds { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        /// <value></value>
        public DateTime? createTime { get; set; } = DateTime.Now;
        /// <summary>
        /// 菜单列表
        /// </summary>
        /// <returns></returns>
        [NotMapped]
        public List<Menu> menus { get; set; } = new List<Menu>();
    }

}