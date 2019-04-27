using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Wings.Base.Common.Entity;

namespace Wings.Projects.Web.Entity.Rbac {
    /// <summary>
    /// 用户管理
    /// </summary>
    [Table ("user")]
    public class User {
        /// <summary>
        /// 主键
        /// </summary>
        /// <value></value>
        [Key]
        [DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        /// <summary>
        /// 昵称
        /// </summary>
        /// <value></value>
        public string nickname { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        /// <value></value>
        [Column (TypeName = "varchar(45)")]
        public string username { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        /// <value></value>
        [Column (TypeName = "varchar(45)")]
        public string password { get; set; }

        /// <summary>
        /// 组织Id
        /// </summary>
        /// <value></value>
        public int? orgId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        /// <value></value>
        public DateTime? createTime { get; set; } = DateTime.Now;
        /// <summary>
        /// 角色类型
        /// </summary>
        /// <value></value>
        public RoleType roleType { get; set; } = RoleType.User;

        /// <summary>
        /// 角色Id列表
        /// </summary>
        /// <value></value>
        public string roleIds { get; set; }
        /// <summary>
        /// 用户组织
        /// </summary>
        /// <value></value>
        [NotMapped]

        public Org org { get; set; }

        /// <summary>
        /// 微信用户Id
        /// </summary>
        /// <value></value>
        public int? wxUserId { get; set; }

        /// <summary>
        /// 微信用户信息
        /// </summary>
        /// <value></value>
        [NotMapped]
        public WxUser wxUser { get; set; }
        /// <summary>
        /// token
        /// </summary>
        /// <value></value>
        [NotMapped]
        public string token { get; set; }
        /// <summary>
        /// 头像
        /// </summary>
        /// <value></value>
        public string headimg { get; set; }
        /// <summary>
        /// 角色列表
        /// </summary>
        /// <value></value>
        [NotMapped]
        public List<Role> roleList { get; set; } = new List<Role> ();
        /// <summary>
        /// 菜单列
        /// </summary>
        /// <value></value>

        [NotMapped]
        public List<Menu> menuList { get; set; }

    }
    /// <summary>
    /// 角色类型
    /// </summary>
    public enum RoleType {
        /// <summary>
        /// 游客
        /// </summary>
        Guest,
        /// <summary>
        /// 用户
        /// </summary>

        User,
        /// <summary>
        /// 管理员
        /// </summary>
        Admin

    }

}