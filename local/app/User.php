<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

    use Authenticatable,
        CanResetPassword;

    protected $fillable = ['user_type', 'first_name', 'last_name', 'username', 'email', 'password', 'profile_picture', 'status', 'is_verified', 'aboutme'];
    //
    

    public function getUserProfilePicture($userimage = "", $size = "") {
        $imageUrl = "";

        if ($userimage != '' && file_exists(base_path() . '/public/profile_picture/' . $size . '/' . $userimage)) {
            $imageUrl = asset('/profile_picture/' . $size . '/') . '/' . $userimage;
        } else {
            $imageUrl = asset('/profile_picture/' . $size . '/') . '/default.jpg';
        }
        return $imageUrl;
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
