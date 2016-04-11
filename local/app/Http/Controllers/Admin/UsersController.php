<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
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
use App\Product;

class UsersController extends Controller {

    public function __construct() {
        $this->userOBJ = new User();
        $this->productOBJ = new Product();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getUserDetails($userID) {
        $user_profile_data = User::where("id", $userID)->first();
        return view('admin.pages.userdetails', compact('user_profile_data'))->with('userOBJ', $this->userOBJ);
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

    public function saveUser(adminAddUserRequest $request) {
        $userId = Input::get('user_id');
        $firstName = e(Input::get('first_name'));
        $lastName = e(Input::get('last_name'));
        $email = e(Input::get('email'));
        $aboutme = e(Input::get('aboutme'));
        $username = e(Input::get('username'));
        $status = e(Input::get('status'));

        if ($userId > 0) {
            $user = User::find($userId);
            $user->first_name = $firstName;
            $user->last_name = $lastName;
            $user->email = $email;
            $user->aboutme = $aboutme;
            $user->username = $username;
            $user->status = $status;
            $user->save();
            if ($user) {
                return Redirect::to("admin/dashboard")->with('success', 'User edited successfully');
            }
        } else {
            $user = User::create(array(
                        'user_type' => 2,
                        'first_name' => $firstName,
                        'last_name' => $lastName,
                        'username' => $username,
                        'email' => $email,
                        'password' => bcrypt(e(Input::get('password'))),
                        'aboutme' => $aboutme,
                        'status' => $status,
                        'is_verified' => 1
            ));
            if ($user) {
                return Redirect::to("admin/dashboard")->with('success', 'User added successfully');
            }
        }
    }

    public function editUser($userId) {
        $user = User::find($userId);
        return view('admin.pages.adduser', compact('user'));
    }

    public function addProduct() {
        $products = Product::find(1);;
        return view('admin.pages.addproduct', compact('products'));
    }

    public function deleteUser($userId) {
        $user = User::find($userId)->delete();
        return Redirect::to("admin/dashboard")->with('success', 'User deleted successfully');
    }

}
