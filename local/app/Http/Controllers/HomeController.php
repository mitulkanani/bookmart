<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\PostedAd;
use App\Country;
use Illuminate\Http\Request;
use App\Http\Requests\adminAddUserRequest;
use App\Http\Requests\PostAdRequest;
use Illuminate\Support\Facades\Lang;
use Validator;
use Input;
use Redirect;
use Mail;
use Auth;
use Config;
use App\Property;
use Image;
use File;
use App\UploadImage;
use Response;
use Illuminate\Support\Facades\Route;
use App\Product;
use App\Category;

class HomeController extends Controller {

    public function __construct() {
        $this->userOBJ = new User();
        $this->PostedAdOBJ = new PostedAd();
        $this->productOBJ = new Product();
        $this->CategoryOBJ = new Category();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        $catlists = $this->CategoryOBJ->getCategoryList();
        return view('front/home', compact('catlists'))->with('productOBJ', $this->productOBJ);
    }

    public function book_mart() {
        $adLists = $this->PostedAdOBJ->getBookadList();
        return view('front/book_mart', compact('adLists'));
    }
    public function transport() {
//        $adLists = $this->PostedAdOBJ->getBookadList();
        return view('front/transport');
    }

    public function open_store() {
//        $adLists = $this->PostedAdOBJ->getBookadList();
        return view('front/store');
    }

    public function more_content() {
        $id = Input::get('getLastContentId');
        $adLists = $this->PostedAdOBJ->getLoadMoreBookList($id);
        return view('front/more_content', compact('adLists'));
    }

    public function gallery() {
        $id = Input::get('id');
        $galleryLists = $this->PostedAdOBJ->getimageList($id);
        $cover_image = e($galleryLists->cover_image);
        $otherImages = explode(',', $galleryLists->images);
        if (empty($otherImages[0])) {
            $otherImages = [];
        }
        $images = array_push($otherImages, $cover_image);
        return view('front/gallery', compact('otherImages'));
    }

    public function view_full_detail() {
        $id = Input::get('id');
        $adsList = $this->PostedAdOBJ->getviewmoreDet($id);
        return view('front/view_more', compact('adsList'));
    }

    public function post_ad() {
        return view('front.post_ad');
    }

    public function how_it_works() {
        return view('front/how_it_works');
    }

    public function search_book() {
        $books = $this->PostedAdOBJ->getbooksList();
    }

    public function searchAjax() {
        $searchvalue = Input::get('searchvalue');
        $searchstring = explode(',', $searchvalue);

        $books = $this->PostedAdOBJ->searchbyBooksName($searchstring[0]);
    }

    public function get_authors() {
        $authors = $this->PostedAdOBJ->getAuthorsList();
    }

    public function searchAdtitle() {
        $Adtitle = Input::get('searchvalue');
        $searchstring = explode(',', $Adtitle);
        $adLists = $this->PostedAdOBJ->searchBooksbytitle($searchstring);
        return view('front/ajax_list', compact('adLists'));
    }

    public function adSave() {

        $ad_title = Input::get('ad_title');
        $author_name = e(Input::get('author_name'));
        $publication = e(Input::get('publication'));
        $edition = e(Input::get('edition'));
        $category = e(Input::get('category'));
        $price = e(Input::get('price'));
        $fixed = e(Input::get('fixed'));
        $owner_name = e(Input::get('owner_name'));
        $mobileno = e(Input::get('mobileno'));
        $password = bcrypt(e(Input::get('password')));
        $college = e(Input::get('college'));
        $address = e(Input::get('address'));
        $city = e(Input::get('city'));
        $ad_type = e(Input::get('ad_type'));
        $status = e(Input::get('status'));
        $adId = 0;

        $pathoriginal = 'ads_picture/original/';
        $path50 = 'ads_picture/thumbnail/';
        $rules = array(
            'ad_title' => 'required',
            'price' => 'required',
            'cover_image' => 'required',
            'password' => 'required',
            'owner_name' => 'required'
        );
        $cover_image = (Input::file('cover_image'));
        $file = array('cover_image' => Input::file('cover_image'));
        $validator = Validator::make($file, $rules);
        $images = Input::file('images');
        $i = 0;
        if (Input::hasFile('images')) {
            foreach ($images as $key => $image) {
                $extension = $image->getClientOriginalExtension(); // getting image extension
                $fileName = time() . $i . '.' . $extension; // renameing image
                $image->move($pathoriginal, $fileName); // uploading file to given path
                File::copy($pathoriginal . $fileName, $path50 . $fileName);
                Image::make($path50 . $fileName)
                        ->resize('100', '100')
                        ->save($path50 . $fileName);
                $i++;
                $img[] = $fileName;
            }
            $other_images = implode(',', $img);
        } else {
            $other_images = "";
        }
        if ($adId > 0) {
//            $user = User::find($userId);
//            $user->first_name = $firstName;
//            $user->last_name = $lastName;
//            $user->email = $email;
//            $user->aboutme = $aboutme;
//            $user->username = $username;
//            $user->status = $status;
//            $user->save();
//            if ($user) {
//                return Redirect::to("admin/dashboard")->with('success', 'User edited successfully');
//            }
        } else {
            $extension = Input::file('cover_image')->getClientOriginalExtension(); // getting image extension
            $fileName = time() . '.' . $extension; // renameing image

            $image = Input::file('cover_image');

            Image::make($image->getRealPath())->resize(200, 310)->save($pathoriginal . $fileName);
            
            File::copy($pathoriginal . $fileName, $path50 . $fileName);
            Image::make($path50 . $fileName)
                    ->resize('50', '50')
                    ->save($path50 . $fileName);

            $ads = PostedAd::create(array(
                        'category' => $category,
                        'ad_type' => $ad_type,
                        'ad_title' => $ad_title,
                        'author_name' => $author_name,
                        'publication' => $publication,
                        'edition' => $edition,
                        'price' => $price,
                        'fixed' => $fixed,
                        'owner_name' => $owner_name,
                        'mobileno' => $mobileno,
                        'password' => $password,
                        'college' => $college,
                        'address' => $address,
                        'city' => $city,
                        'cover_image' => $fileName,
                        'images' => $other_images,
                        'status' => $status,
            ));
            if ($ads) {
                return Redirect::to("/")->with('success', 'Ad posted successfully');
            }
        }
    }

    public function banUser() {
        if (Input::has('questionId')) {
            $userId = Input::get('questionId');
            $banUser = User::find($userId);
            if ($banUser->status == 0)
                $banUser->status = 1;
            else
                $banUser->status = 0;
            $banUser->update();
        }
    }

    public function doVerified() {
        if (Input::has('userId')) {
            $userId = Input::get('userId');
            $userData = User::find($userId);
            if ($userData->is_verified == 0)
                $userData->is_verified = 1;
            else
                $userData->is_verified = 0;

            $userData->update();
            echo $userData->is_verified;
            exit;
        }
    }

    public function addUser() {
        $user = array();
        return view('admin.pages.adduser', compact('user'));
    }

    public function editUser($userId) {
        $user = User::find($userId);
        return view('admin.pages.adduser', compact('user'));
    }

    public function deleteUser($userId) {
        $user = User::find($userId)->delete();
        return Redirect::to("admin/dashboard")->with('success', 'User deleted successfully');
    }

}
