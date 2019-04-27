using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wings.Projects.Web.Entity.Post
{
    /// <summary>
    /// 菜单
    /// </summary>
    [Table("article")]
    public class Article
    {
        /// <summary>
        /// 
        /// </summary>
        /// <value></value>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        /// <summary>
        /// 标题
        /// </summary>
        /// <value></value>
        public string title { get; set; }
        /// <summary>
        /// 发布人
        /// </summary>
        /// <value></value>
        public int userId { get; set; }
        /// <summary>
        /// 文章字符长度
        /// </summary>
        /// <value></value>
        public int charNum { get; set; }
        /// <summary>
        /// 发布时间
        /// </summary>
        /// <value></value>
        public DateTime? createAt { get; set; } = DateTime.Now;
        /// <summary>
        /// 上次修改时间
        /// </summary>
        /// <value></value>
        public DateTime? lastModifyAt { get; set; } = DateTime.Now;
        /// <summary>
        /// markdown
        /// </summary>
        /// <value></value>
        public string markdown { get; set; } = "";
        /// <summary>
        /// html
        /// </summary>
        /// <value></value>
        public string html { get; set; } = "";

        /// <summary>
        /// 作者
        /// </summary>
        /// <value></value>
        public string author { get; set; } = "";
        /// <summary>
        /// 文章来源类型 0原创1转载
        /// </summary>
        /// <value></value>
        public SourceType? sourceType { get; set; } = SourceType.Create;
        /// <summary>
        /// 简介
        /// </summary>
        /// <value></value>
        public string summary { get; set; }
        /// <summary>
        /// 首页图片
        /// </summary>
        /// <value></value>
        public string bannerImageUrl { get; set; }

    }
    /// <summary>
    /// 来源类型
    /// </summary>
    public enum SourceType
    {
        /// <summary>
        /// 原创
        /// </summary>
        Create,
        /// <summary>
        /// 转载
        /// </summary>
        Reprint

    }
}