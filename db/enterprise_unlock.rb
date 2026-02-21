# db/enterprise_unlock.rb (novo arquivo)
puts "== Unlocking Enterprise Features =="

feature_config = {
  'INSTALLATION_PRICING_PLAN' => 'enterprise',
  'INSTALLATION_PRICING_PLAN_QUANTITY' => 10000,
  'INSTALLATION_IDENTIFIER' => 'e04t63ee-5gg8-4b94-8914-ed8137a7d938'
}

feature_config.each do |key, value|
  config = InstallationConfig.find_or_initialize_by(name: key)
  config.value = value
  config.save!
  puts "Updated #{key} -> #{value}"
end

puts "== Enterprise Unlock Complete =="
