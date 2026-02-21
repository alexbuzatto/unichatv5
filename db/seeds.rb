# loading installation configs
GlobalConfig.clear_cache
ConfigLoader.new.process

## Seeds productions
if Rails.env.production?
  # [UNICHAT] Completely remove onboarding flag to prevent truthy string checks ("false" is truthy in Ruby)
  Redis::Alfred.delete(Redis::Alfred::CHATWOOT_INSTALLATION_ONBOARDING)
end


# [UNICHAT] Essential Seeds for Production & Dev
# This ensures the admin user and base accounts exist and are synced with correct credentials
# We find or create the account, then find OR initialize the user to force sync critical attributes
account = Account.find_or_create_by!(name: 'Unichat Inc')
user = User.find_or_initialize_by(email: 'tecnologia@eclicksolucoes.com.br')
user.name = 'Admin EClick'
user.password = 'Cidadelog_conectada1'
user.type = 'SuperAdmin'
user.ui_settings = { locale: 'pt_BR' }
user.skip_confirmation!
user.save!

AccountUser.find_or_create_by!(
  account_id: account.id,
  user_id: user.id,
  role: :administrator
)

unless Rails.env.production?

  inbox = Inbox.create!(channel: web_widget, account: account, name: 'Acme Support')
  InboxMember.create!(user: user, inbox: inbox)

  contact_inbox = ContactInboxWithContactBuilder.new(
    source_id: user.id,
    inbox: inbox,
    hmac_verified: true,
    contact_attributes: { name: 'jane', email: 'jane@example.com', phone_number: '+2320000' }
  ).perform

  conversation = Conversation.create!(
    account: account,
    inbox: inbox,
    status: :open,
    assignee: user,
    contact: contact_inbox.contact,
    contact_inbox: contact_inbox,
    additional_attributes: {}
  )

  # sample email collect
  Seeders::MessageSeeder.create_sample_email_collect_message conversation

  Message.create!(content: 'Hello', account: account, inbox: inbox, conversation: conversation, sender: contact_inbox.contact,
                  message_type: :incoming)

  # sample location message
  #
  location_message = Message.new(content: 'location', account: account, inbox: inbox, sender: contact_inbox.contact, conversation: conversation,
                                 message_type: :incoming)
  location_message.attachments.new(
    account_id: account.id,
    file_type: 'location',
    coordinates_lat: 37.7893768,
    coordinates_long: -122.3895553,
    fallback_title: 'Bay Bridge, San Francisco, CA, USA'
  )
  location_message.save!

  # sample card
  Seeders::MessageSeeder.create_sample_cards_message conversation
  # input select
  Seeders::MessageSeeder.create_sample_input_select_message conversation
  # form
  Seeders::MessageSeeder.create_sample_form_message conversation
  # articles
  Seeders::MessageSeeder.create_sample_articles_message conversation
  # csat
  Seeders::MessageSeeder.create_sample_csat_collect_message conversation

  CannedResponse.create!(account: account, short_code: 'start', content: 'Hello welcome to Unichat.')

  # Unlock Enterprise Features automatically
  load Rails.root.join('db', 'enterprise_unlock.rb')
end
