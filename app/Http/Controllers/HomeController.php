<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\PostedAd;
use App\Country;
use Illuminate\Http\Request;
use App\Http\Requests\adminAddUserRequest;
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
        return view('front.gallery');
    }

    public function post_ad() {
        return view('front.post_ad');
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

    public function adSave() {
//        adminAddUserRequest $request

        $book_name = Input::get('book_name');
        $ad_title = Input::get('ad_title');
        $auther_name = e(Input::get('auther_name'));
        $publication = e(Input::get('publication'));
        $edition = e(Input::get('edition'));
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
//        $path110 = base_path() . '/property_picture/270/';
        $path50 = base_path() . '/public/ads_picture/thumbnail/';
//        $path220 = base_path() . '/public/property_picture/220/';

        $rules = array('cover_image' => 'required', 'images' => 'mimes:jpeg,bmp,png');
        $cover_image = (Input::file('cover_image'));
        $file = array('cover_image' => Input::file('cover_image'));
        $validator = Validator::make($file, $rules);
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
            //$destinationPath = 'uploads'; // upload path
            $extension = Input::file('cover_image')->getClientOriginalExtension(); // getting image extension
            $fileName = time() . $adId . '.' . $extension; // renameing image
            //chmod($pathoriginal,0777);	
            //chmod($path110,0777);	
            //chmod($path50,0777);	

            Input::file('cover_image')->move($pathoriginal, $fileName); // uploading file to given path
//                    File::copy($pathoriginal . $fileName, $path110 . $fileName);
//                    Image::make($path110 . $fileName)
//                            ->resize('270', '320')
//                            ->save($path110 . $fileName);
//
            File::copy($pathoriginal . $fileName, $path50 . $fileName);
            Image::make($path50 . $fileName)
                    ->resize('100', '100')
                    ->save($path50 . $fileName);
//
//                    File::copy($pathoriginal . $fileName, $path220 . $fileName);
//                    Image::make($path220 . $fileName)
//                            ->resize('220', '270')
//                            ->save($path220 . $fileName);
            $ads = PostedAd::create(array(
                        'book_name' => $book_name,
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
                        'ad_type' => $ad_type,
                        'cover_image' => $fileName,
                        'status' => $status,
            ));
            if ($ads) {
                return Redirect::to("/")->with('success', 'Ad posted successfully');
            }
        }
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
