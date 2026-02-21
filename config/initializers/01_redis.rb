if ENV['PRECOMPILE_ASSETS']
  class DummyRedis
    def initialize(*); end
    def method_missing(*); end
    def respond_to_missing?(*); true; end
  end
end

# Alfred
# Add here as you use it for more features
# Used for Round Robin, Conversation Emails & Online Presence
alfred_size = ENV.fetch('REDIS_ALFRED_SIZE', 5)
$alfred = ConnectionPool.new(size: alfred_size, timeout: 1) do
  if ENV['PRECOMPILE_ASSETS']
    redis = DummyRedis.new
  else
    redis = Rails.env.test? ? MockRedis.new : Redis.new(Redis::Config.app)
  end
  Redis::Namespace.new('alfred', redis: redis, warning: true)
end

# Velma : Determined protector
# used in rack attack
$velma = ConnectionPool.new(size: 5, timeout: 1) do
  if ENV['PRECOMPILE_ASSETS']
    config = DummyRedis.new
  else
    config = Rails.env.test? ? MockRedis.new : Redis.new(Redis::Config.app)
  end
  Redis::Namespace.new('velma', redis: config, warning: true)
end
