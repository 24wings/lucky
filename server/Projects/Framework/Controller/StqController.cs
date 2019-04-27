using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using DevExtreme.AspNet.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wings.Base.Common.Attrivute;
using Wings.Base.Common.DTO;
using Wings.Base.Common.Services;
using Wings.Projects.Web;
using Wings.Projects.Web.Entity.Rbac;

namespace Wings.Projects.Video.Controllers
{

    /// <summary>
    /// 单表查询
    /// </summary>
    [Route("/api/stq")]
    public class StqController
    {
        private RcxhContext db { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public StqController(RcxhContext _db)
        {
            this.db = _db;
        }
        /// <summary>
        /// 列出所有视频
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public object listVideo()
        {
            return OSSService.listFiles();
        }
        /// <summary>
        /// 上传视频
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public object query()
        {
            return this.db.Query<User>().FromSql("select * from dbo.user")
             .AsNoTracking()
            .ToList();
        }
    }
}