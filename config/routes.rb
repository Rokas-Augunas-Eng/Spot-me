Rails.application.routes.draw do
  devise_for :users 
  root to: 'pages#home'
  get 'profile', to: 'pages#profile'

  resources :gyms do
    resources :bookings, only:[:new, :create, :update, :edit, :index]
  end
end
  # For future implementaiton admin access only  
  # resources :bookings, only:[:delete, :update, :edit, :destroy] 
