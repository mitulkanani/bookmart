<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Contracts\Auth\Guard;
use Auth;
use Redirect;
class AuthenticateAdminOnly
{
    protected $auth;
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }
    public function handle($request, Closure $next)
    {

        if (Auth::check())
        {
            if ($this->auth->user()->user_type != 1)
            {
                $this->auth->logout(); // optionally logout the user here
                //return Redirect::to('/admin');    
            }
        }

        if ($this->auth->guest())
        {
            if ($request->ajax())
            {
                return response('Unauthorized.', 401);
            }
            else
            {
                return view('admin.pages.signin');
            }
        }


        return $next($request);
    }
}