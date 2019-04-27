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
    [Route("/api/Hk/user")]
    public class UserController : CurdController<User>
    {
        private RcxhContext db { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_db"></param>
        public UserController(RcxhContext _db) : base(_db)
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
            var query = (from u in this.db.users
                         select new User
                         {
                             username = u.username,
                             nickname = u.nickname,
                             password = u.password,
                             org = (from o in this.db.orgs where o.orgId == u.orgId select o).FirstOrDefault(),
                         });
            return DataSourceLoader.Load(query, options);

        }
        /// <summary>
        /// 增加数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public object insert(DevExtremInput input)
        {
            return this.insert(input, new User(), this.db.users);
        }

        /// <summary>
        /// 移除数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpDelete]
        public object remove(DevExtremInput input)
        {
            return this.remove(input.key, this.db.users);
        }
        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPut]
        public object update([FromForm] DevExtremInput input)
        {

            var user = this.db.users.Find(input.key);
            JsonConvert.PopulateObject(input.values, user);
            user.orgId = user.org?.orgId;

            this.db.SaveChanges();
            return true;

        }
    }
}