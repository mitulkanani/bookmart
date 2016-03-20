<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class PostedAd extends Model implements AuthenticatableContract, CanResetPasswordContract {

    use Authenticatable,
        CanResetPassword;

    protected $fillable = ['ad_id', 'ad_type', 'ad_title', 'auther_name', 'publication', 'edition', 'price', 'college', 'type', 'mobile', 'images', 'owner_name'];

    //


    public function getBookadList() {
        $bookDetails = PostedAd::Select('posted_ads.*')
                ->get();

        return $bookDetails;
    }

    public function getuserDetail($username) {
        $userDetails = User::Select('users.*', 'user_types.type')
                ->leftjoin('user_types', 'user_types.id', '=', 'users.user_type')
                ->where("users.username", $username)
                ->get()
                ->first();

        return $userDetails;
    }

    public function getUserList() {
        $userData = User::select('users.*')
                        //->where('users.status',1)
                        ->orderBy('users.id', 'desc')->get();
        return $userData;
    }

}
