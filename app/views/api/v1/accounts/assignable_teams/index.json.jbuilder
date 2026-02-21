json.array! @teams do |team|
  json.id team.id
  json.name team.name
  json.description team.description
  json.allow_auto_assign team.allow_auto_assign
end
