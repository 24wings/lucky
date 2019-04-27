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
    [Table("Org")]
    public partial class Org
    {
        /// <summary>
        /// 主键
        /// </summary>
        /// <value></value>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int orgId { get; set; }
        /// <summary>
        /// 组织名称
        /// </summary>
        /// <value></value>
        [Column(TypeName = "varchar(45)")]
        public string orgName { get; set; }
        /// <summary>
        /// 上级组织id
        /// </summary>
        /// <value></value>
        public int parentId { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? createTime = DateTime.Now;

    }

}