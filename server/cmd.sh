dotnet ef migrations add  $(date +%s)   --context $1
dotnet ef database update --context $1 
dotnet ef migrations remove --context $1 