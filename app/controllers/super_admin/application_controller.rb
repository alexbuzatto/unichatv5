# All Administrate controllers inherit from this
# `Administrate::ApplicationController`, making it the ideal place to put
# authentication logic or other before_actions.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
class SuperAdmin::ApplicationController < Administrate::ApplicationController
  include ActionView::Helpers::TagHelper
  include ActionView::Context
  include SuperAdmin::NavigationHelper

  helper_method :render_vue_component, :settings_open?, :settings_pages
  # authenticiation done via devise : SuperAdmin Model
  before_action :authenticate_super_admin!
  before_action :set_global_config

  # Override this value to specify the number of elements to display at a time
  # on index pages. Defaults to 20.
  # def records_per_page
  #   params[:per_page] || 20
  # end

  def order
    @order ||= Administrate::Order.new(
      params.fetch(resource_name, {}).fetch(:order, 'id'),
      params.fetch(resource_name, {}).fetch(:direction, 'desc')
    )
  end

  private

  def set_global_config
    # [UNICHAT] Force Global Branding for Super Admin
    @global_config = {
      'INSTALLATION_NAME' => 'Unichat',
      'BRAND_NAME' => 'Unichat',
      'LOGO_THUMBNAIL' => '/favicon.png',
      'LOGO' => '/brand-assets/logo.png',
      'LOGO_DARK' => '/brand-assets/logo.png',
      'LOGO_SUPER_ADMIN' => '/brand-assets/logo.png'
    }

    # Override with Account Branding if available
    return unless current_user

    account = current_user.accounts.first
    return unless account&.branding_config.present?

    @global_config['LOGO_SUPER_ADMIN'] = account.branding_config['logo_super_admin'] if account.branding_config['logo_super_admin'].present?
  end

  def render_vue_component(component_name, props = {})
    html_options = {
      id: 'app',
      data: {
        component_name: component_name,
        props: props.to_json
      }
    }
    content_tag(:div, '', html_options)
  end

  def invalid_action_perfomed
    # rubocop:disable Rails/I18nLocaleTexts
    flash[:error] = 'Invalid action performed'
    # rubocop:enable Rails/I18nLocaleTexts
    redirect_back(fallback_location: root_path)
  end
end
