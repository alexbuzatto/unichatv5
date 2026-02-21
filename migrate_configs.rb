# Migration script to convert InstallationConfig YAML data to JSON
InstallationConfig.all.each do |config|
  raw = config.serialized_value
  if raw.is_a?(String) && raw.start_with?('---')
    begin
      # Load legacy YAML
      val = YAML.unsafe_load(raw)
      # Re-save as proper JSON (ActiveRecord will handle it since column is jsonb)
      config.serialized_value = val
      config.save!
      puts "Migrated #{config.name}"
    rescue => e
      puts "Failed to migrate #{config.name}: #{e.message}"
    end
  end
end
