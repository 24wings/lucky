using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Wings.Base.Common.Attrivute;
using Wings.Base.Common.DTO;
using Wings.Projects.Web.Entity.Rbac;

namespace Wings.Projects.Web.Controllers {
    /// <summary>
    /// 配置
    /// </summary>
    public class Config {
        /// <summary>
        /// 密钥
        /// </summary>
        /// <value></value>
        public static string secret { get; set; } = "my-secret";
    }
    /// <summary>
    /// token实例
    /// </summary>
    public class TokenInstance {
        /// <summary>
        /// 用户id
        /// </summary>
        /// <value></value>
        public int userId { get; set; }
    }
    /// <summary>
    /// 登录输入
    /// </summary>
    public class LoginInput {
        /// <summary>
        /// 用户名
        /// </summary>
        /// <value></value>
        public string username { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        /// <value></value>
        public string password { get; set; }
    }
    /// <summary>
    /// 自动化管理控制器
    /// </summary>
    [ApiController]
    [Route ("/api/Rcxh/Auth")]
    public class AuthController : Controller {

        private RcxhContext db { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="_db"></param>
        public AuthController (RcxhContext _db) { db = _db; }
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="input"></param>
        [HttpPost ("[action]")]
        public Rtn<User> login ([FromBody] LoginInput input) {
            var user = (from u in this.db.users where u.username == input.username select new User {
                id = u.id,
                    roleList = (from r in this.db.roles where ("," + u.roleIds + ",").Contains ("," + r.id + ",") select r).ToList (),
                    password = u.password

            }).FirstOrDefault ();
            if (user != null) {
                if (user.password == input.password) {
                    var token = new JwtBuilder ()
                        .WithAlgorithm (new HMACSHA256Algorithm ())
                        .WithSecret (Config.secret)
                        .AddClaim ("user", new User { id = user.id })
                        .Build ();
                    var menuIds = new List<string> ();
                    foreach (var r in user.roleList) {

                        foreach (var mid in r.menuIds.Split (",")) {
                            menuIds.Add (mid);
                        }

                    }

                    Console.WriteLine (menuIds.ToArray ().Length);
                    var ids = menuIds.Distinct ();
                    user.menuList = (from m in this.db.menus where ids.Contains (m.id.ToString ()) select m).ToList ();

                    return Rtn<User>.Success (user);
                } else {
                    return Rtn<User>.Error ("密码错误");
                }
            } else {
                return Rtn<User>.Error ("用户不存在");
            }

        }
        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost ("[action]")]
        public CommonRtn signup ([FromBody] LoginInput input) {
            var user = (from u in this.db.users where u.username == input.username select u).FirstOrDefault ();
            if (user != null) {
                return CommonRtn.Error ("用户已经注册");
            } else {
                var newUser = new User { nickname = "新用户", username = input.username, password = input.password, roleType = RoleType.User };
                this.db.users.Add (newUser);
                this.db.SaveChanges ();
                return CommonRtn.Success (new Dictionary<string, object> { { "user", newUser } });
            }

        }

    }
}