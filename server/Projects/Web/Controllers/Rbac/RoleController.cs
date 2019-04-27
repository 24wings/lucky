using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Wings.Base.Common.Attrivute;
using Wings.Base.Common.DTO;
using Wings.Projects.Web.Controllers;
using Wings.Projects.Web.Entity.Rbac;


namespace Wings.Projects.Web.RBAC.Controllers
{
    /// <summary>
    /// 组织管理
    /// </summary>
    [Route("/api/Hk/role")]
    public class RoleController : CurdController<Role>
    {
        private RcxhContext db { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_db"></param>
        public RoleController(RcxhContext _db) : base(_db)
        {
            db = _db;
        }
        /// <summary>
        /// 查询数据
        /// </summary>
        /// <param name="options"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public object load(DataSourceLoadOptions options)
        {
            return DataSourceLoader.Load((from r in this.db.roles select new Role { id = r.id, roleName = r.roleName, menus = (from m in this.db.menus where r.menuIds.Contains("," + m.id + ",") select m).ToList() }), options);

        }
        /// <summary>
        /// 增加数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public object insert([FromForm] DevExtremInput input)
        {

            return this.insert(input, new Role(), this.db.roles);
        }

        /// <summary>
        /// 移除数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpDelete]
        public object remove(DevExtremInput input)
        {
            return this.remove(input.key, this.db.roles);
        }
        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPut]
        public object update([FromForm] DevExtremInput input)
        {
            var roleManage = new Role();

            var role = this.db.roles.Find(input.key);

            JsonConvert.PopulateObject(input.values, roleManage);
            JsonConvert.PopulateObject(input.values, role);
            var menuIds = "," + String.Join(",", (from m in roleManage.menus select m.id.ToString()).ToArray()) + ",";
            role.menuIds = menuIds;
            Console.WriteLine(menuIds);
            return this.db.SaveChanges();

            // return this.update(input, this.db.roles);
        }

    }
}