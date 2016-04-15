<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class BookMart extends Model implements AuthenticatableContract, CanResetPasswordContract {

    use Authenticatable,
        CanResetPassword;

    protected $fillable = ['cover_image', 'category', 'ad_type','password', 'ad_title', 'auther_name', 'publication', 'edition', 'price', 'college', 'address', 'fixed', 'type', 'mobileno', 'images', 'owner_name'];

//


    public function getBookadList() {
        $bookDetails = BookMart::Select('book_marts.*')
                ->take(9)
                ->orderBy('book_marts.id', 'desc')
                ->get();
        return $bookDetails;
    }

    public function getLoadMoreBookList($id) {
        $bookDetails = BookMart::Select('book_marts.*')
                ->take(6)
                ->where('book_marts.id', '<', $id)
                ->where("status", '=', 1)
                ->orderBy('book_marts.id', 'desc')
                ->get();
        return $bookDetails;
    }

    public function getimageList($id) {
        $imageDetails = BookMart::Select('book_marts.cover_image', 'book_marts.images')
                ->where("book_marts.id", $id)
                ->get()
                ->first();
        return $imageDetails;
    }
    public function getviewmoreDet($id) {
        $imageDetails = BookMart::Select('book_marts.*')
                ->where("book_marts.id", $id)
                ->get()
                ->first();
        return $imageDetails;
    }

    public function getbooksList() {
        $books_json = BookMart::Select('book_marts.ad_title')
                ->where("status", '=', '1')
                ->get();
        file_put_contents('search_json/books.json', $books_json);
        return $books_json;
    }

    public function searchbyBooksName($string) {
        $books_json = BookMart::Select('book_marts.ad_title')
                ->where("status", '=', '1')
                ->get();
        return $books_json;
    }

    public function getAuthorsList() {
        $authors_json = BookMart::Select('book_marts.author_name')
                ->where("status", '=', '1')
                ->get();
        file_put_contents('search_json/authors.json', $authors_json);
        return $authors_json;
    }

    public function searchbyAuthorName($string) {
        $books_json = BookMart::Select('book_marts.ad_title')
                ->where("status", '=', '1')
                ->get();
        return $books_json;
    }

    public function searchBooksbytitle($string) {
        $books_list = BookMart::Select('book_marts.*')
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
