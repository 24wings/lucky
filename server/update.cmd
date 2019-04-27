dotnet ef  dbcontext \
scaffold   "Data Source=101.132.96.199;Database=wings;User Id=root;Password=123456;Convert Zero Datetime=True;Allow User Variables=True; "\
  Pomelo.EntityFrameworkCore.MySql --context-dir Base/RBAC/DataAccess  --output-dir  Base/RBAC/Entity --force \
--context Rbac  