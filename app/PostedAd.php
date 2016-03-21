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

    protected $fillable = ['cover_image','category','ad_type', 'ad_title', 'auther_name', 'publication', 'edition', 'price', 'college','address','fixed', 'type', 'mobileno', 'images', 'owner_name'];

    //


    public function getBookadList() {
        $bookDetails = PostedAd::Select('posted_ads.*')
                ->get();

        return $bookDetails;
    }

    public function getimageList($id) {
        $imageDetails = PostedAd::Select('posted_ads.cover_image','posted_ads.images')
                ->where("posted_ads.id", $id)
                ->get()
                ->first();
       
        return $imageDetails;
    }

    public function getUserList() {
        $userData = User::select('users.*')
                        //->where('users.status',1)
                        ->orderBy('users.id', 'desc')->get();
        return $userData;
    }

}
