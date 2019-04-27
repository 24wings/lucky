using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Wings.Base.Common.Attrivute;
using Wings.Projects.Web.Entity.Post;
using Wings.Projects.Web.Entity.Rbac;

namespace Wings.Projects.Web
{
    /// <summary>
    /// 航空数据环境
    /// </summary>
    public partial class RcxhContext : DbContext
    {
        /// <summary>
        /// 
        /// </summary>
        public RcxhContext() { }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        /// <returns></returns>

        public RcxhContext(DbContextOptions<RcxhContext> options) : base(options) { }
        /// <summary>
        /// 用户表
        /// </summary>
        /// <value></value>
        public DbSet<User> users { get; set; }
        /// <summary>
        /// 角色管理
        /// </summary>
        /// <value></value>
        public DbSet<Role> roles { get; set; }
        /// <summary>
        /// 组织
        /// </summary>
        /// <value></value>
        public DbSet<Org> orgs { get; set; }
        /// <summary>
        /// 菜单
        /// </summary>
        /// <value></value>
        public DbSet<Menu> menus { get; set; }
        /// <summary>
        /// 文章
        /// </summary>
        /// <value></value>
        public DbSet<Article> articles { get; set; }





        /// <summary>
        /// 
        /// </summary>
        /// <param name="optionsBuilder"></param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        /// <summary>
        /// 数据库实体创建时
        /// 1.null 扫描Wings.Hk 命名空间下的所有表
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var _namespace_ = "Wings.Projects";
            var dvos = Assembly.GetExecutingAssembly().GetTypes().Where(t => (t.GetCustomAttribute(typeof(TableAttribute)) != null ||
             t.GetCustomAttribute(typeof(TreeListViewAttribute)) != null) && t.Namespace.StartsWith(_namespace_)).ToArray();
            Type[] paramTypes = dvos;
            // tables = new Dictionary<string, DbSet<object>> ();
            foreach (Type type in paramTypes)
            {
                if (type.IsClass)
                {
                    // var method = modelBuilder.GetType ().GetMethod ("Entity", new Type[] { });
                    // method = method.MakeGenericMethod (new Type[] { type });
                    // method.Invoke (modelBuilder, null);
                }
            }

            base.OnModelCreating(modelBuilder);
        }
    }

}