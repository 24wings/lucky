using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Cucr.CucrSaas.App.Service;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Wings.Base.Common.Attrivute;
using Wings.Base.Common.DTO;
using Wings.Projects.Web.Controllers;
using Wings.Projects.Web.Entity.Post;
using Wings.Projects.Web.Entity.Rbac;

namespace Wings.Projects.Web.RBAC.Controllers
{
    /// <summary>
    /// 创建文章
    /// </summary>
    public class CreateArticleInput
    {
        /// <summary>
        /// 标题
        /// </summary>
        /// <value></value>
        public string title { get; set; }
        /// <summary>
        /// html
        /// </summary>
        /// <value></value>
        public string html { get; set; }
        /// <summary>
        /// markdown
        /// </summary>
        /// <value></value>
        public string markdown { get; set; }
        /// <summary>
        /// 作者
        /// </summary>
        /// <value></value>
        public string author { get; set; }
        /// <summary>
        /// 简介
        /// </summary>
        /// <value></value>
        public string summary { get; set; }
        /// <summary>
        /// 首版头像
        /// </summary>
        /// <value></value>
        public string bannerImageUrl { get; set; }
        /// <summary>
        /// 文章来源类型
        /// </summary>
        /// <value></value>
        public SourceType sourceType { get; set; } = SourceType.Create;
    }
    /// <summary>
    /// 组织管理
    /// </summary>
    [Route("/api/Hk/article")]
    public class ArticleController : CurdController<Article>
    {
        private RcxhContext db { get; set; }
        /// <summary>
        /// 用户业务
        /// </summary>
        /// <value></value>
        private IUserService userService { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="_db"></param>
        /// <param name="_userService"></param>
        public ArticleController(RcxhContext _db, IUserService _userService) : base(_db)
        {
            this.userService = _userService;
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
            var tokenUser = this.userService.getUserFromAuthcationHeader();
            var query = (from a in this.db.articles where a.userId == tokenUser.id select a);
            return DataSourceLoader.Load(query, options);
        }
        /// <summary>
        /// 增加数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public object insert([FromBody]CreateArticleInput input)
        {
            var article = new Article
            {
                html = input.html,
                title = input.title,
                markdown = input.markdown,
                author = input.author,
                sourceType = input.sourceType,
                bannerImageUrl = input.bannerImageUrl,
                summary = input.summary,
            };
            var tokenUser = this.userService.getUserFromAuthcationHeader();
            if (tokenUser != null)
            {
                article.userId = tokenUser.id;
                article.charNum = input.markdown.Length;
                this.db.articles.Add(article);
                this.db.SaveChanges();

            }



            return Rtn<Article>.Success(article);
        }

        /// <summary>
        /// 移除数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpDelete]
        public object remove(DevExtremInput input)
        {
            return this.remove(input.key, this.db.articles);
        }
        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPut]
        public object update([FromForm] DevExtremInput input)
        {
            return this.update(input, this.db.articles);
        }
    }
}