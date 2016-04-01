<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class Cms extends Model implements AuthenticatableContract, CanResetPasswordContract {

    use Authenticatable,
        CanResetPassword;

    protected $fillable = ['slug', 'subject', 'message','status',];
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

    public function getcmsDetail($cms_id) {
        $CmsDetails = User::Select('cms.*')
                ->where("cms.id", $cms_id)
                ->get()
                ->first();

        return $CmsDetails;
    }

    public function getCmsList() {
        $CmsData = Cms::select('cms.*')
                        //->where('users.status',1)
                        ->orderBy('cms.id', 'desc')->get();
        return $CmsData;
    }

}
