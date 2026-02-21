# [UNICHAT] Telemetry Disabled
class ChatwootHub
  BASE_URL = 'http://localhost'.freeze
  PING_URL = "".freeze
  REGISTRATION_URL = "".freeze
  PUSH_NOTIFICATION_URL = "".freeze
  EVENTS_URL = "".freeze
  BILLING_URL = "".freeze
  CAPTAIN_ACCOUNTS_URL = "".freeze

  def self.installation_identifier
    identifier = InstallationConfig.find_by(name: 'INSTALLATION_IDENTIFIER')&.value
    identifier ||= InstallationConfig.create!(name: 'INSTALLATION_IDENTIFIER', value: SecureRandom.uuid).value
    identifier
  end

  def self.billing_url
    "#"
  end

  def self.pricing_plan
    # Force Enterprise plan return if checked here
    'enterprise'
  end

  def self.pricing_plan_quantity
    999999
  end

  def self.support_config
    {
      support_website_token: nil,
      support_script_url: nil,
      support_identifier_hash: nil
    }
  end

  def self.instance_config
    {
      installation_identifier: installation_identifier,
      installation_version: Chatwoot.config[:version],
      installation_host: 'localhost',
      installation_env: 'production',
      edition: 'enterprise'
    }
  end

  def self.instance_metrics
    {
      accounts_count: 0,
      users_count: 0,
      inboxes_count: 0,
      conversations_count: 0,
      incoming_messages_count: 0,
      outgoing_messages_count: 0,
      additional_information: {}
    }
  end

  def self.fetch_count(model)
    0
  end

  def self.sync_with_hub
    # [UNICHAT] Telemetry blocked. Returning mock success response.
    { "status" => "ok" }
  end

  def self.register_instance(company_name, owner_name, owner_email)
    # [UNICHAT] Registration blocked.
    true
  end

  def self.send_push(fcm_options)
    # [UNICHAT] Push notifications via Hub blocked.
    true
  end

  def self.get_captain_settings(account)
    # [UNICHAT] Captain settings blocked.
    nil
  end

  def self.emit_event(event_name, event_data)
    # [UNICHAT] Event emission blocked.
    true
  end
end
