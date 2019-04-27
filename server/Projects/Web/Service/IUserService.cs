using System;

using JWT;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Wings.Projects.Web.Entity.Rbac;

namespace Cucr.CucrSaas.App.Service
{
    /// <summary>
    /// 写入json的user
    /// </summary>
    public class TokenUserJsonObject
    {
        /// <summary>
        /// 用户信息
        /// </summary>
        /// <value></value>
        public User user { get; set; }
    }

    /// <summary>
    /// 用户业务接口
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="appToken"></param>
        /// <returns></returns>
        string getUserToken(User appToken);

        /// <summary>
        /// 根据token解码用户信息
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        User decodeToken(string token);
        /// <summary>
        /// 根据请求头Authcation 获取并且解析出用户
        /// </summary>
        /// <returns></returns>
        User getUserFromAuthcationHeader();
    }

    /// <summary>
    /// 用户业务具体实现
    /// </summary>
    public class UserService : IUserService
    {
        /// <summary>
        /// 密钥
        /// </summary>
        public const string secret = "my-secret";
        private IHttpContextAccessor accessor;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="_accessor"></param>
        public UserService(IHttpContextAccessor _accessor)
        {
            this.accessor = _accessor;
        }

        /// <summary>
        /// 获取用户登录的token
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public string getUserToken(User user)
        {
            var token = new JwtBuilder()
                .WithAlgorithm(new HMACSHA256Algorithm())
                .WithSecret(secret)

                // .AddClaim ("tokenInstance", appToken.tokenInstance)
                .AddClaim("user", user)
                .Build();
            return token;
        }

        /// <summary>
        /// 根据token 解密token数据
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>

        public User decodeToken(string token)
        {
            // if(token==null){
            //     throw  new HttpException
            // }
            if (token.StartsWith("Bearer "))
            {
                token = token.Replace("Bearer ", "");
            }
            try
            {
                var json = new JwtBuilder()
                    .WithSecret(secret)
                    // .MustVerifySignature ()
                    .Decode(token);
                Console.WriteLine(json);
                return JsonConvert.DeserializeObject<TokenUserJsonObject>(json).user;
            }
            catch (TokenExpiredException)
            {
                Console.WriteLine("Token has expired");
                return null;
            }
            catch (SignatureVerificationException)
            {
                Console.WriteLine("Token has invalid signature");
                return null;
            }
        }

        /// <summary>
        /// 根据Header的Authzacation获取用户信息
        /// </summary>
        /// <returns></returns>
        public User getUserFromAuthcationHeader()
        {
            Console.WriteLine("get header: start");
            var tokenHeader = this.accessor.HttpContext.Request.Headers["Authorization"];
            Console.WriteLine("get header:" + tokenHeader);
            return this.decodeToken(tokenHeader);
        }

    }

}