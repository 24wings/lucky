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
using Wings.Projects.Web.Entity.Rbac;

namespace Wings.Projects.Video.Controllers {
    /// <summary>
    /// 上传响应
    /// </summary>
    public class UploadOutput {
        /// <summary>
        /// 文件名
        /// </summary>
        /// <value></value>
        public string filename { get; set; }
        /// <summary>
        /// 文件地址
        /// </summary>
        /// <value></value>
        public string url { get; set; }
        /// <summary>
        /// 上传响应体
        /// </summary>
        /// <value></value>
        public object res { get; set; }

    }
    /// <summary>
    /// 视频上传文件
    /// </summary>
    public class UploadVideoInput {
        /// <summary>
        /// 文件名
        /// </summary>
        /// <value></value>
        public string filename { get; set; }
        /// <summary>
        /// 上传文件,
        /// 使用FormData上传
        /// </summary>
        /// <value></value>
        public IFormFile file { get; set; }
    }
    /// <summary>
    /// 组织管理
    /// </summary>
    [Route ("/api/Video/video")]
    public class VideoController {
        /// <summary>
        /// 
        /// </summary>
        public VideoController () {

        }
        /// <summary>
        /// 列出所有视频
        /// </summary>
        /// <returns></returns>
        [HttpGet ("[action]")]
        public object listVideo () {
            return OSSService.listFiles ();
        }
        /// <summary>
        /// 上传视频
        /// </summary>
        /// <returns></returns>
        [HttpPost ("[action]")]
        public object uploadVideo ([FromForm] UploadVideoInput input) {
            var filename = "upload/" + DateTime.Now.Second + input.filename;

            //将源文件 读取成文件流
            Stream fromFile = input.file.OpenReadStream ();
            var res = OSSService.uploadFile (fromFile, filename);
            return Rtn<UploadOutput>.Success (new UploadOutput {
                url = "http://tpjs.95t92.cn/" + filename,
                    filename = filename,
                    res = res
            });

        }
    }
}