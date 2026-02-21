class Api::V1::Accounts::AssignableTeamsController < Api::V1::Accounts::BaseController
  def index
    # Return all teams except the ones the current user is already in
    my_team_ids = current_user.teams.where(account_id: Current.account.id).pluck(:id)
    
    @teams = Current.account.teams
                             .where.not(id: my_team_ids)
                             .order(:name)
  end
end
