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

class HomeController extends Controller {

    public function __construct() {
        $this->userOBJ = new User();
        $this->PostedAdOBJ = new PostedAd();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        $adLists = $this->PostedAdOBJ->getBookadList();
        return view('home', compact('adLists'));
    }

    public function gallery() {
        $id = Input::get('id');
        $galleryLists = $this->PostedAdOBJ->getimageList($id);
        $cover_image = e($galleryLists->cover_image);
        $otherImages = explode(',', $galleryLists->images);
        $images = array_push($otherImages, $cover_image);
        return view('front.gallery', compact('otherImages'));
    }

    public function post_ad() {
        return view('front.post_ad');
    }

    public function adSave(PostAdRequest $request) {

        $ad_title = Input::get('ad_title');
        $auther_name = e(Input::get('auther_name'));
        $publication = e(Input::get('publication'));
        $edition = e(Input::get('edition'));
        $category = e(Input::get('category'));
        $price = e(Input::get('price'));
        $fixed = e(Input::get('fixed'));
        $owner_name = e(Input::get('owner_name'));
        $mobileno = e(Input::get('mobileno'));
        $college = e(Input::get('college'));
        $address = e(Input::get('address'));
        $city = e(Input::get('city'));
        $ad_type = e(Input::get('ad_type'));
        $status = e(Input::get('status'));
        $adId = 0;

        $pathoriginal = base_path() . '/public/ads_picture/original/';
        $path50 = base_path() . '/public/ads_picture/thumbnail/';

        $rules = array(
            'name' => 'cover_image',
            'location' => 'required',
            'capacity' => 'required',
            'description' => 'required',
            'image' => 'required|array'
        );
        $cover_image = (Input::file('cover_image'));
        $file = array('cover_image' => Input::file('cover_image'));
        $validator = Validator::make($file, $rules);
        $images = Input::file('images');
        $i = 0;
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

            Input::file('cover_image')->move($pathoriginal, $fileName); // uploading file to given path
//
            File::copy($pathoriginal . $fileName, $path50 . $fileName);
            Image::make($path50 . $fileName)
                    ->resize('100', '100')
                    ->save($path50 . $fileName);

            $ads = PostedAd::create(array(
                        'category' => $category,
                        'ad_type' => $ad_type,
                        'ad_title' => $ad_title,
                        'auther_name' => $auther_name,
                        'publication' => $publication,
                        'edition' => $edition,
                        'price' => $price,
                        'fixed' => $fixed,
                        'owner_name' => $owner_name,
                        'mobileno' => $mobileno,
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
