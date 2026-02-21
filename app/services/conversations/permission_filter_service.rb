class Conversations::PermissionFilterService
  attr_reader :conversations, :user, :account

  def initialize(conversations, user, account)
    @conversations = conversations
    @user = user
    @account = account
  end

  def perform
    return conversations if user_role == 'administrator'

    accessible_conversations
  end

  private

  def accessible_conversations
    team_ids = user.teams.where(account_id: account.id).pluck(:id)
    
    # Agents see conversations that:
    # 1. Belong to an inbox they are a member of
    # AND
    # 2. Are assigned to one of their teams OR have no team assigned (to allow pick-up/triage)
    conversations.where(inbox: user.inboxes.where(account_id: account.id))
                 .where(team_id: [nil] + team_ids)
  end

  def account_user
    AccountUser.find_by(account_id: account.id, user_id: user.id)
  end

  def user_role
    account_user&.role
  end
end

Conversations::PermissionFilterService.prepend_mod_with('Conversations::PermissionFilterService')
