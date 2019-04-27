using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wings.Projects.Web.Entity.Rbac
{
    /// <summary>
    /// 微信用户
    /// </summary>
    [Table("wx_user")]
    public class WxUser
    {
        /// <summary>
        /// 主键
        /// </summary>
        /// <value></value>
        [Key]
        public int id { get; set; }
        /// <summary>
        /// 昵称
        /// </summary>
        /// <value></value>
        public string nickname { get; set; }
        /// <summary>
        /// 头像
        /// </summary>
        /// <value></value>
        public string headimg { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        /// <value></value>
        public DateTime? createAt { get; set; }
        /// <summary>
        /// 省份
        /// </summary>
        /// <value></value>
        public string provice { get; set; }
        /// <summary>
        /// openId
        /// </summary>
        /// <value></value>
        public string openid { get; set; }

    }
}