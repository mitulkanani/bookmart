<?php namespace AdamWathan\EloquentOAuth;

use Closure;
use App\User;
use Illuminate\Support\Facades\Redirect;
use AdamWathan\EloquentOAuth\Providers\ProviderInterface;
use App\AuthorizeUser;
use Auth;

class Authenticator
{
    protected $auth;
    protected $users;
    protected $identities;

    public function __construct($auth, $users, $identities)
    {
        $this->auth = $auth;
        $this->users = $users;
        $this->identities = $identities;
    }

    public function login($providerAlias, $userDetails, $callback = null)
    {
        $user = $this->getUser($providerAlias, $userDetails);
                                            
		/* If user is not signup with our system and tried to login get them back to signpu page */		
		$userexist = User::where('email', '=', $userDetails->email)->where('social_provider','=',$providerAlias)->first();
		
		if (empty($userexist) && !\Session::has('checkUserIdentity')) {                        
			// user doesn't exist
			\Session::put('no_user_error_message', 'No record found for this email with '.$providerAlias.' signup in our database');
			return Redirect::to('signup');								
		}
	 
		
		/* Check user profile validation */
		$userIdentity = \Session::get('checkUserIdentity');
                
		if($userIdentity == 'yes' && Auth::check())
		{        
			/*Save data for user authorization*/
			$userIdentity = AuthorizeUser::create(array(
	                                'user_id' => Auth::user()->id,
	                                'email' => $userDetails->email,
	                                'social_id' => $userDetails->id,
	                                'social_provider' => $providerAlias
	                    ));	
			
			\Session::put('profile_validation_success', 'Your profile verified successfully');
			return Redirect::to('profile');
		}
		
		/* Redirect user to login page if same email exist */
		if(User::where('email', '=', $userDetails->email)->where('social_provider','<>',$providerAlias)->exists())
		{
			\Session::put('social_error_message', 'This email already exist in our database, Please use different email');
		    return Redirect::to('/login');				
		}
		
        if ($callback) {
            $callback($user, $userDetails);
        }
        $this->updateUser($user, $providerAlias, $userDetails);
        $this->auth->login($user);
    }

    protected function getUser($providerAlias, $details)
    {
        if ($this->identities->userExists($providerAlias, $details)) {
            return $this->getExistingUser($providerAlias, $details);
        }
        return $this->users->create();
    }

    protected function updateUser($user, $providerAlias, $details)
    {
        $this->users->store($user);
        $this->storeProviderIdentity($user, $providerAlias, $details);
    }

    protected function getExistingUser($providerAlias, $details)
    {
        $identity = $this->identities->getByProvider($providerAlias, $details);
        return $this->users->findByIdentity($identity);
    }

    protected function storeProviderIdentity($user, $providerAlias, $details)
    {
        if ($this->identities->userExists($providerAlias, $details)) {
            $this->updateProviderIdentity($providerAlias, $details);
        } else {
            $this->addProviderIdentity($user, $providerAlias, $details);
        }
    }

    protected function updateProviderIdentity($providerAlias, $details)
    {
        $identity = $this->identities->getByProvider($providerAlias, $details);
        $identity->access_token = $details->access_token;
        $this->identities->store($identity);
    }

    protected function addProviderIdentity($user, $providerAlias, $details)
    {
        $identity = new OAuthIdentity;
        $identity->user_id = $user->getKey();
        $identity->provider = $providerAlias;
        $identity->provider_user_id = $details->id;
        $identity->access_token = $details->access_token;
        $this->identities->store($identity);
    }
}
