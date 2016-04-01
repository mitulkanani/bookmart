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

    protected $fillable = ['cover_image', 'category', 'ad_type','password', 'ad_title', 'auther_name', 'publication', 'edition', 'price', 'college', 'address', 'fixed', 'type', 'mobileno', 'images', 'owner_name'];

//


    public function getBookadList() {
        $bookDetails = PostedAd::Select('posted_ads.*')
                ->take(9)
                ->orderBy('posted_ads.id', 'desc')
                ->get();
        return $bookDetails;
    }

    public function getLoadMoreBookList($id) {
        $bookDetails = PostedAd::Select('posted_ads.*')
                ->take(6)
                ->where('posted_ads.id', '<', $id)
                ->where("status", '=', 1)
                ->orderBy('posted_ads.id', 'desc')
                ->get();
        return $bookDetails;
    }

    public function getimageList($id) {
        $imageDetails = PostedAd::Select('posted_ads.cover_image', 'posted_ads.images')
                ->where("posted_ads.id", $id)
                ->get()
                ->first();
        return $imageDetails;
    }
    public function getviewmoreDet($id) {
        $imageDetails = PostedAd::Select('posted_ads.*')
                ->where("posted_ads.id", $id)
                ->get()
                ->first();
        return $imageDetails;
    }

    public function getbooksList() {
        $books_json = PostedAd::Select('posted_ads.ad_title')
                ->where("status", '=', '1')
                ->get();
        file_put_contents('search_json/books.json', $books_json);
        return $books_json;
    }

    public function searchbyBooksName($string) {
        $books_json = PostedAd::Select('posted_ads.ad_title')
                ->where("status", '=', '1')
                ->get();
        return $books_json;
    }

    public function getAuthorsList() {
        $authors_json = PostedAd::Select('posted_ads.author_name')
                ->where("status", '=', '1')
                ->get();
        file_put_contents('search_json/authors.json', $authors_json);
        return $authors_json;
    }

    public function searchbyAuthorName($string) {
        $books_json = PostedAd::Select('posted_ads.ad_title')
                ->where("status", '=', '1')
                ->get();
        return $books_json;
    }

    public function searchBooksbytitle($string) {
        $books_list = PostedAd::Select('posted_ads.*')
                ->whereIn("ad_title", $string) //For multiple value use whereIn,second parameter of whereIn() needs to be an array.
                ->get();
        return $books_list;
    }

    public function getUserList() {
        $userData = User::select('users.*')
//->where('users.status',1)
                        ->orderBy('users.id', 'desc')->get();
        return $userData;
    }

}
