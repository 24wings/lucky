#!/bin/bash
dotnet ef  dbcontext \
scaffold   "Data Source=47.100.63.224;Database=wings;User Id=root;Password=8US7DJ3WB5v;Convert Zero Datetime=True;Allow User Variables=True;"\
  Pomelo.EntityFrameworkCore.MySql --context-dir Base/RBAC/DataAccess  --output-dir  Base/RBAC/Entity --force \
--context WingsContext --data-annotations -s



